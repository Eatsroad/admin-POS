import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appMiddleware } from './middleware/App';
import AuthReducer, { Auth } from './reducers/AuthReducer';
import OrderReducer, { Order } from './reducers/OrderReducer';
import StoreReducer, { Store } from './reducers/StoreReducer';
import UIReducer, { UI } from './reducers/UIReducer';

const reducer = combineReducers({
  Auth: AuthReducer,
  Store: StoreReducer,
  UI: UIReducer,
  Order:OrderReducer,

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

}

export default store;
