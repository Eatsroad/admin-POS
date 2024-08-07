import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appMiddleware } from './middleware/App';
import AuthReducer, { Auth } from './reducers/AuthReducer';
import CancelMenuReducer, { CheckedItem } from './reducers/CancelMenuReducer';
import OrderReducer, { Order } from './reducers/OrderReducer';
import StoreReducer, { Store } from './reducers/StoreReducer';
import UIReducer, { UI } from './reducers/UIReducer';
import ObserverReducer, {Observer}from './reducers/ObserverReducer';


const reducer = combineReducers({
  Auth: AuthReducer,
  Store: StoreReducer,
  UI: UIReducer,
  Order:OrderReducer,
  CancelMenu:CancelMenuReducer,
  Observer:ObserverReducer

});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...appMiddleware))
);

export interface RootState {
  Auth: Auth;
  Store: Store;
  UI: UI;
  Order: Order,
  CancelMenu: CheckedItem,
  Observer:Observer,

}

export default store;
