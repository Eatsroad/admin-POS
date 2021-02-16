import { dbService } from '@firebase';
import { RootState } from '@redux';
import { OrderAction } from '@redux/actions';
import { checkOrders } from '@redux/actions/OrderAction';
import { Orders } from '@redux/reducers/OrderReducer';
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
                snapShot.forEach((doc) => {
                    const order = {
                        table_number:doc.id,
                        ...doc.data()
                    }
                    orders.push(order);
                });
                console.log(orders);
                dispatch(OrderAction.setOrders(orders));
            })
        
    }
    if(OrderAction.Types.C_CHECK_ORDER === action.type) {
        const orders = getState().Order.orders;
        switch(action.payload.mode) {
            case 0:
                let checkedOrders:any[] = [];
                orders.map((order) => {
                    if(order.table_number === action.payload.table_number) {
                        console.log(order.receipt)
                        checkedOrders = order.receipt.map((item) => !item.state ? {...item, state:true} : item)
                    }
                })
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
                        'bucket':[]
                    });
                break;
            default:
                return;

        };
        
    
    };
}