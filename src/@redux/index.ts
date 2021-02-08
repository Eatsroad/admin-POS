import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appMiddleware } from './middleware/App';
import AuthReducer, { Auth } from './reducers/AuthReducer';
import StoreReducer, { Store } from './reducers/StoreReducer';
import UIReducer, { UI } from './reducers/UIReducer';

const reducer = combineReducers({
  Auth: AuthReducer,
  Store: StoreReducer,
  UI: UIReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...appMiddleware))
);

export interface RootState {
  Auth: Auth;
  Store: Store;
  UI: UI;
}

export default store;
