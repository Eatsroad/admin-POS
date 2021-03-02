import { StoreAction } from '../actions';
import { Action } from '../Types';

interface Category {
  name: string;
  description: string;
}
interface Option {
  name: string;
  price: number;
}
interface OptionGroup {
  name: string;
  max_select: number;
  options: Option[];
}
interface Item {
  name: string;
  price: string;
  description: string;
  categories: string[];
  option_groups: number[];
}

export interface Store {
  information: {
    name: string;
    address: string;
    phone: string;
    table:number;
    store_photo_url:string
  };
  menu: {
    categories: Category[];
    optionGroups: OptionGroup[];
    items: Item[];
  };
  storeId:string
}

const initialState: Store = {
  information: {
    name: '',
    address: '',
    phone: '',
    table:0,
    store_photo_url:''
  },
  menu: {
    categories: [],
    optionGroups: [],
    items: [],
  },
  storeId:''
};

const StoreReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case StoreAction.Types.SET_STORE_INFO:
      return {
        ...state,
        information: {
          name: action.payload.name,
          address: action.payload.address,
          phone: action.payload.phone,
          table: action.payload.table
        },
      };
    case StoreAction.Types.S_STORE_ID:
      return {
        ...state,
        storeId:action.payload.storeId,
      }
    case StoreAction.Types.SET_STORE_MENU:
      return {
        ...state,
        menu: action.payload.menu,
      };
    default:
      return state;
  }
};

export default StoreReducer;
