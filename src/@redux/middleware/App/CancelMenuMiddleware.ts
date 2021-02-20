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
    
    if(CancelMenuAction.Types.C_CHECK_ITEM === action.type) {
        if(action.payload.state) {
            console.log(action.payload)
            dispatch(CancelMenuAction.setCanceledItemAdd(action.payload.id));
        } else {
            console.log(action.payload)
            dispatch(CancelMenuAction.setCanceledItemDelete(action.payload.id));
        }
    };
    if(CancelMenuAction.Types.Q_CANCEL_ITEM === action.type) {
        const checkedItems = getState().CancelMenu.checkedItem;
        let orders = getState().Order.orders;
        let newReceipts:Receipt[] = [];
        console.log(checkedItems);
        //고쳐야함 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㄴ
        for(let i=0 ; i<checkedItems.length ; i++) {
            for(let k=0 ; k<orders.length ; k++) {
                if(orders[k].table_number === action.payload.tableNumber) {
                    for(let j=0 ; j<orders[k].receipt.length ; j++) {
                        if(orders[k].receipt[j].order_time === action.payload.orderTime) {
                            for(let l=0 ; l<orders[k].receipt[j].receipts.length; l++) {
                                if(orders[k].receipt[j].receipts[l].id === action.payload.id) {
                                    console.log(orders[k].receipt[j].receipts[l].state);
                                    orders[k].receipt[j].receipts[l].state = "주문 거부";
                                }
                            }
                        }
                        newReceipts.push(orders[k].receipt[j]);
                    }
                }
            }
        }
        console.log("new: ", newReceipts);
    }
    
};

export default CancelMenuMiddleware;