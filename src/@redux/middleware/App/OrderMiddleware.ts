import { dbService } from '@firebase';
import { RootState } from '@redux';
import { OrderAction } from '@redux/actions';
import { Receipt } from '@redux/reducers/OrderReducer';
import { Action } from '@redux/Types';

interface param {
    dispatch: any;
    getState: () => RootState;
};

export const OrderMiddleware = ({dispatch, getState}:param) => (
    next:any
) => (action:Action) => {
    next(action);
   const storeId = window.localStorage.getItem('storeId')

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

                    data.receipt.map((rec:any) => {
                        if(rec.state === "주문 완료") {
                            receipts.push(rec);
                        }
                    })
                    orders.push(order);
                });
                dispatch(OrderAction.setOrders(orders));
                console.log(receipts);
            })
        
    }
    if(OrderAction.Types.C_CHECK_ORDER === action.type) {
        const orders = getState().Order.orders;
        switch(action.payload.mode) {
            case 0:
                let checkedOrders:Receipt[] = [];
                for(let i=0 ; i<orders.length ; i++) {
                    if(orders[i].table_number === action.payload.table_number) {
                        for(let k=0 ; orders[i].receipt.length ; k++) {
                            console.log(orders[i].receipt)
                            // let rece:Receipt = {};s
                            if(orders[i].receipt[k].state === "주문 완료") {
                                for(let j=0 ; j<orders[i].receipt[k].receipts.length ; j++) {
                                }
                            }
                        }
                        checkedOrders = orders[i].receipt;
                    }
                }
                console.log(checkedOrders);
                dbService
                    .collection('stores')
                    .doc(`${storeId}`)
                    .collection('orders')
                    .doc(`${action.payload.table_number}`)
                    .update({
                        // 'receipt':[
                        //     ...checkedOrders
                        // ],
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
                        'bucket':[]
                    });
                break;
            default:
                return;

        };
        
    
    };
}