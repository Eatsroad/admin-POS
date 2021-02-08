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
  };
  menu: {
    categories: Category[];
    optionGroups: OptionGroup[];
    items: Item[];
  };
}

const initialState: Store = {
  information: {
    name: '',
    address: '',
    phone: '',
  },
  menu: {
    categories: [],
    optionGroups: [],
    items: [],
  },
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
        },
      };

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
