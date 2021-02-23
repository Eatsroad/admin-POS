import { dbService } from '@firebase';
import { RootState } from '@redux';
import { CancelMenuAction } from '@redux/actions';
import { Receipt } from '@redux/reducers/OrderReducer';
import { Action } from '@redux/Types';

interface param {
    dispatch: any;
    getState: () => RootState;
};

export const CancelMenuMiddleware = ({dispatch, getState}:param) => (
    next:any
) => (action:Action) => {
    next(action);
    const storeId = window.localStorage.getItem('storeId');
    
    if(CancelMenuAction.Types.C_CHECK_ITEM === action.type) {
        if(action.payload.state) {
            dispatch(CancelMenuAction.setCanceledItemAdd(action.payload.id));
        } else {
            dispatch(CancelMenuAction.setCanceledItemDelete(action.payload.id));
        }
    };
    if(CancelMenuAction.Types.Q_CANCEL_ITEM === action.type) {
        let checkedItems = getState().CancelMenu.checkedItem;
        let orders = getState().Order.orders;
        let newReceipts:Receipt[] = [];
        console.log(action.payload)
        for(let k=0 ; k<orders.length ; k++) {
            if(orders[k].table_number === action.payload.tableNumber) {
                for(let j=0 ; j<orders[k].receipt.length ; j++) {
                    if(orders[k].receipt[j].order_time === action.payload.orderTime) {
                        for(let l=0 ; l<orders[k].receipt[j].receipts.length; l++) {
                            for(let i=0 ; i<checkedItems.length ; i++) {
                                if(orders[k].receipt[j].receipts[l].id === checkedItems[i]) {
                                    orders[k].receipt[j].receipts[l].state = "주문 거부";
                                }
                            }
                        }
                        newReceipts.push(orders[k].receipt[j]);
                    }
                }
                break;
            }
            
        }
        dbService
            .collection('stores')
            .doc(`${storeId}`)
            .collection('orders')
            .doc(`${action.payload.tableId}`)
            .update({
                'receipt':[
                    ...newReceipts
                ]
            }).then(() => {
                console.log('success')
            } )
    };
    
    if(CancelMenuAction.Types.Q_CANCEL_ITEM_TABLE === action.type) {
        let checkedTableItem = getState().CancelMenu.checkedTableItem;
        let orders = getState().Order.orders;
        let newReceipts:Receipt[] = [];
        for(let k=0 ; k<orders.length ; k++) {
            if(orders[k].table_number === action.payload.tableNumber) {
                for(let i=0;i<orders[k].receipt.length;i++){
                    for(let j=0 ;j<checkedTableItem.length; j++) {
                        if(orders[k].receipt[i].order_time === checkedTableItem[j].orderTime) {
                            for(let l=0 ; l<orders[k].receipt[i].receipts.length; l++) {
                                if(orders[k].receipt[i].receipts[l].id === checkedTableItem[j].id) {
                                    orders[k].receipt[i].receipts[l].state = "주문 거부";
                                }
                            }
                        }
                    }
                    newReceipts.push(orders[k].receipt[i]);
                }
                break;
            }
        }
        console.log(newReceipts);
        dbService
            .collection('stores')
            .doc(`${storeId}`)
            .collection('orders')
            .doc(`${action.payload.tableId}`)
            .update({
                'receipt':[
                    ...newReceipts
                ]
            }).then(() => {
                console.log('success')
            } )
    }
};

export default CancelMenuMiddleware;