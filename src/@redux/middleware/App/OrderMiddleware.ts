import { dbService } from '@firebase';
import { RootState } from '@redux';
import { OrderAction } from '@redux/actions';
import { Buckets, Orders, Receipt } from '@redux/reducers/OrderReducer';
import { Action } from '@redux/Types';

interface param {
    dispatch: any;
    getState: () => RootState;
};

export const OrderMiddleware = ({dispatch, getState}:param) => (
    next:any
) => (action:Action) => {
    next(action);
   const storeId = window.localStorage.getItem('storeId');
   const orders = getState().Order.orders;

    if(OrderAction.Types.C_LOAD_ORDERS === action.type) {
        window.localStorage.setItem('storeId',action.payload.storeId);
        dbService
            .collection('stores')
            .doc(`${action.payload.storeId}`)
            .collection('orders')
            .orderBy('orderAt')
            .onSnapshot((snapShot) => {
                let orders:any[] = [];
                let receipts:any[] = [];
                snapShot.forEach((doc) => {
                    const data = doc.data();
                    const order = {
                        table_number:doc.id,
                        ...data
                    };
                    data.receipt.forEach((rec:any) => {
                        if(rec.state === "주문 완료") {
                            let tmpReceipts:any[] = [];
                            let count = 0;
                            console.log(rec.receipts)
                            rec.receipts.forEach((item:any) => {
                                if(item.state === "주문 완료") {
                                    tmpReceipts.push(item);
                                    count++;
                                };
                            });
                            let newOrder = {
                                table_number:doc.id,
                                receipts: tmpReceipts,
                                ...rec
                            };
                            if(count !== 0) receipts.push(newOrder);
                        }
                    })
                    orders.push(order);
                });
                console.log(orders, receipts);
                dispatch(OrderAction.setOrders(orders,receipts));
            });
    };
    if(OrderAction.Types.C_DENY_ORDER_ITEM === action.type) {
        let newReceipts: Receipt[] = [];
        for(let k = 0 ; k<orders.length ; k++){
            if(orders[k].table_number === action.payload.table_number) {
                console.log('')
                const newOrdersObj = orders[k].receipt;
                for(let i=0 ; i<action.payload.id.length; i++ ) {
                    const index = orders[k].receipt.findIndex((receipt) => {
                        return receipt.receipts.findIndex((item) => {
                            return item.id === action.payload.id[i]
                        })
                    })
                    newOrdersObj.splice(index, 1);

                };
                newReceipts = newOrdersObj;
            }
        };
        console.log(newReceipts);
        // dbService
        //     .collection('stores')
        //     .doc(`${storeId}`)
        //     .collection('orders')
        //     .doc(`${action.payload.table_number}`)
        //     .update({
        //     })
    }
    if(OrderAction.Types.C_CHECK_ORDER === action.type) {
        
        switch(action.payload.mode) {
            case 0:
                let checkedOrders:Receipt[] = [];
                for(let i=0 ; i<orders.length ; i++) {
                    if(orders[i].table_number === action.payload.table_number) {
                        for(let k=0 ; k<orders[i].receipt.length ; k++) {
                            if(orders[i].receipt[k].state === "주문 완료" && orders[i].receipt[k].order_time === action.payload.order_time ) {
                                let newRe:Buckets[] = [];
                                for(let j=0 ; j<orders[i].receipt[k].receipts.length ; j++) {
                                    let newO = orders[i].receipt[k].receipts[j];
                                    if(orders[i].receipt[k].receipts[j].state === "주문 완료") newO.state = "접수 완료";
                                    newRe.push(newO);
                                    console.log(newO)
                                };
                                let obj:Receipt = {
                                    ...orders[i].receipt[k],
                                    state:"접수 완료",
                                    receipts:newRe
                                };
                                checkedOrders.push(obj);
                                console.log(obj);
                            } else {
                                checkedOrders.push(orders[i].receipt[k]);
                            }
                        }
                    }
                };
                console.log(checkedOrders);
                dbService
                    .collection('stores')
                    .doc(`${storeId}`)
                    .collection('orders')
                    .doc(`${action.payload.table_number}`)
                    .update({
                        'receipt':[
                            ...checkedOrders
                        ],
                        'state':true,
                    });
                break;
            case 1:
                dbService
                    .collection('stores')
                    .doc(`${storeId}`)
                    .collection('orders')
                    .doc(`${action.payload.table_number}`)
                    .update({
                        'receipt':[],
                        'state':false,
                        'order_state':false,
                        'receipt_total_price':0,
                        'total_price':0,
                        'bucket':[],
                        'orderAt':''
                    });
                break;
            default:
                return;

        };
        
    
    };
}