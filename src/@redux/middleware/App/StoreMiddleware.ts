import { Action } from '@redux/Types';
import { OrderAction, StoreAction, UIAction } from '@redux/actions';
import { dbService, storage } from '@firebase';
import { RootState } from '@redux';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
// import {Category} from "@redux/reducers/StoreReducer";
//const store=window.localStorage.setItem()
interface param {
  dispatch: any;
  getState: () => RootState;
}

export const StoreMiddleware = ({ dispatch, getState }: param) => (
  next: any
) => async (action: Action) => {
  next(action);
  
  const category = getState().Store.menu.categories;
  const categoryLength = category.length;
  const option = getState().Store.menu.optionGroups;
  const optionGroupsLength=getState().Store.menu.optionGroups.length;
    
  if(StoreAction.Types.ADD_OPTIONGROUP_FIREBASE===action.type){
    dbService
        .collection('stores')
        .where('ownerId', '==', getState().Auth.uid)
        .get()
        .then((querySnapshot) =>
            querySnapshot.forEach((store) => {
                console.log('[StoreMiddleware] found a store');
                store.ref
                    .update({
                        'menu.optionGroups': firebase.firestore.FieldValue.arrayUnion({
                            name: action.payload.name,
                            maxSelect:action.payload.max_Select,
                            options:action.payload.options
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
  if(StoreAction.Types.DELETE_OPTION_FIREBASE===action.type){
      const groupName = action.payload.name;
      const optionName = action.payload.optionName;

      let arr:any=[];
      let modifOptions:any = {
          name:'',
          maxSelect:0,
          options:[]
      }
      for(let i=0; i<optionGroupsLength;i++){
          console.log(groupName)
          if(getState().Store.menu.optionGroups[i].name===groupName){
              modifOptions.maxSelect=0;
              modifOptions.name=groupName;
              for(let j=0; j<getState().Store.menu.optionGroups[i].options.length;j++){
                  if(getState().Store.menu.optionGroups[i].options[j].name!=optionName){
                      modifOptions.options.push(getState().Store.menu.optionGroups[i].options[j]);
                  }
              }
              arr.push(modifOptions);
          }else{
              arr.push(getState().Store.menu.optionGroups[i])
          }
      }
      const categories = getState().Store.menu.categories;
      const items = getState().Store.menu.items;
      dbService
          .collection('stores')
          .where('ownerId', '==', getState().Auth.uid)
          .get()
          .then((querySnapshot) =>
              querySnapshot.forEach((store) => {
                  console.log('[StoreMiddleware] found a store~');
                  store.ref
                      .update({
                          'menu': {
                              'categories':[
                                  ...categories
                              ],
                              'items':[
                                  ...items
                              ],
                              'optionGroups': [
                                  ...arr
                              ]
                          }
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
  if(StoreAction.Types.DELETE_OPTIONGROUP_FIREBASE===action.type){
      const groupName=action.payload.name;

      let arr:any=[];
      for(let i=0; i<optionGroupsLength;i++){
          if(getState().Store.menu.optionGroups[i].name!=groupName) {
              arr.push(getState().Store.menu.optionGroups[i]);
          }
      }
      const categories = getState().Store.menu.categories;
      const items = getState().Store.menu.items;
      console.log(arr)
      dbService
          .collection('stores')
          .where('ownerId', '==', getState().Auth.uid)
          .get()
          .then((querySnapshot) =>
              querySnapshot.forEach((store) => {
                  console.log('[StoreMiddleware] found a store!!');
                  store.ref
                      .update({
                          'menu': {
                              'categories':[
                                  ...categories
                              ],
                              'items':[
                                  ...items
                              ],
                              'optionGroups': [
                                  ...arr
                              ]
                          }
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
  if (StoreAction.Types.FETCH_STORE_INFO === action.type) {

  }
  if (StoreAction.Types.ADD_MENU_FIREBASE === action.type) {
    // const storeId = getState().Store.storeId
    // console.log(storeId, action.payload.PhotoUrl)
    // let photoUrl:string = '';
    // if(action.payload.PhotoUrl !== null) {
    //   const getUrl = async () => {
    //     const fileRef =  storage.ref().child(`${storeId}/${uuidv4()}`);
    //     const response = await fileRef.putString(action.payload.PhotoUrl, 'data_url');
    //     photoUrl = await response.ref.getDownloadURL();
    //   }
    //   getUrl();
    //   dbService
    //     .collection('stores')
    //     .where('ownerId', '==', getState().Auth.uid)
    //     .get()
    //     .then((querySnapshot) =>
    //       querySnapshot.forEach((store) => {
    //         console.log('[StoreMiddleware] found a store');
    //         store.ref
    //           .update({
    //             'menu.items': firebase.firestore.FieldValue.arrayUnion({
    //               name: action.payload.name,
    //               description: action.payload.description,
    //               price: action.payload.price,
    //               categories: [...action.payload.categories],
    //               optionGroups:[],
    //               photoUrl:photoUrl
    //             }),
    //           })
    //           .then(() => {
    //             dispatch(StoreAction.loadStoreFirebase());
    //           })
    //           .catch((e) => {
    //             console.log(e.message);
    //           });
    //       })
    //     )
    //   .catch((e) => console.log(e.message));
    // } else {
    //   dbService
    //   .collection('stores')
    //   .where('ownerId', '==', getState().Auth.uid)
    //   .get()
    //   .then((querySnapshot) =>
    //     querySnapshot.forEach((store) => {
    //       console.log('[StoreMiddleware] found a store');
    //       store.ref
    //         .update({
    //           'menu.items': firebase.firestore.FieldValue.arrayUnion({
    //             name: action.payload.name,
    //             description: action.payload.description,
    //             price: action.payload.price,
    //             categories: [...action.payload.categories],
    //             optionGroups:[],
    //             photoUrl:''
    //           }),
    //         })
    //         .then(() => {
    //           dispatch(StoreAction.loadStoreFirebase());
    //         })
    //         .catch((e) => {
    //           console.log(e.message);
    //         });
    //     })
    //   )
    //   .catch((e) => console.log(e.message));
    // }
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
                photoUrl:action.payload.PhotoUrl
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
