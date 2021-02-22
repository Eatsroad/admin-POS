import { Action } from '@redux/Types';
import { OrderAction, StoreAction, UIAction } from '@redux/actions';
import { dbService } from '@firebase';
import { RootState } from '@redux';
import firebase from 'firebase';

interface param {
  dispatch: any;
  getState: () => RootState;
}

export const StoreMiddleware = ({ dispatch, getState }: param) => (
  next: any
) => (action: Action) => {
  next(action);

  if (StoreAction.Types.FETCH_STORE_INFO === action.type) {
  }

  if (StoreAction.Types.ADD_MENU_FIREBASE === action.type) {
    dbService
      .collection('stores')
      .where('ownerId', '==', getState().Auth.uid)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((store) => {
          console.log('[StoreMiddleware] found a store');
          store.ref
            .update({
              'menu.items': firebase.firestore.FieldValue.arrayUnion({
                name: action.payload.name,
                description: action.payload.description,
                price: action.payload.price,
                categories: [...action.payload.categories],
                optionGroups:[],
              }),
            })
            .then(() => {
              dispatch(StoreAction.loadStoreFirebase());
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
      )
      .catch((e) => console.log(e.message));
  }

  if (StoreAction.Types.LOAD_STORE_FIREBASE === action.type) {
    dbService
      .collection('stores')
      .where('ownerId', '==', getState().Auth.uid)
      .get()
      .then((querySnapshot) =>{
        querySnapshot.forEach((store) => {
          dispatch(OrderAction.loadOrders(store.id));
          dispatch(StoreAction.setStoreId(store.id))

          const { information, menu } = store.data();
          const { name, address, phone, table } = information;
          dispatch(StoreAction.setStoreInformation(name, address, phone, table));
          dispatch(StoreAction.setStoreMenu(menu));
        });
        dispatch(UIAction.setGlobalLoading(false));
      })
      .catch((e) => console.log(e));
  }
  if(StoreAction.Types.MODIF_TABLE === action.type) {
    const orderId = getState().Store.storeId;
    for(let i=0 ; i<action.payload.table ; i++) {
      dbService
        .collection("stores")
        .doc(`${orderId}`)
        .collection('orders')
        .add({
          orderAt:'',
          receipt:[],
          bucket:[],
          total_price:0,
          receipt_total_price:0,
          state:false,
          order_state:false,
          table_number: i+1
        }).then(()=>{
          console.log("success!");
          dispatch(UIAction.setGlobalLoading(false));
        }).catch((e)=>{
          console.log(e);
        })
    }
  }
  if (StoreAction.Types.ADD_CATEGORY_FIREBASE === action.type) {
    console.log('[StoreMiddleware] middle ware add category');
    dbService
      .collection('stores')
      .where('ownerId', '==', getState().Auth.uid)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((store) => {
          console.log('[StoreMiddleware] found a store');
          store.ref
            .update({
              'menu.categories': firebase.firestore.FieldValue.arrayUnion({
                id: getState().Store.menu.categories.length,
                description: action.payload.description,
                name: action.payload.name,
              }),
            })
            .then(() => {
              dispatch(StoreAction.loadStoreFirebase());
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
      )
      .catch((e) => console.log('fuck'));
  }
};
