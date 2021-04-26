import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_CART,
  DELETE_ITEM_FROM_CART
} from '../actions/types';


const initialState = {
  productsInCart: [],
  totalPrice: 0,
  totalCount: 0
};


const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const currentPizzaItems = !state.productsInCart ? [action.payload] : [...state.productsInCart, action.payload];
      return {
        ...state,
        productsInCart: currentPizzaItems,
        totalPrice: state.totalPrice + action.payload.currentCost
      };

    case REMOVE_ITEM_FROM_CART:
      const newww = [];
      let count = 0;

      state.productsInCart.forEach((el) => {
        if (count === 0) {
          if (el.id === action.payload.id && el.size === action.payload.size && el.type === action.payload.type) {
            count = 1;
            newww.push(el);
          } else {
            newww.push(el);
          }
        } else if (count === 1) {
          if (el.id === action.payload.id && el.size === action.payload.size && el.type === action.payload.type) {
            count = 2;
            return
          } else {
            newww.push(el);
          }
        } else if (count === 2) {
          newww.push(el);
        }

      });

      const currentPizzaItemsMinus = !state.productsInCart ? [action.payload] : newww;
      return {
        ...state,
        productsInCart: currentPizzaItemsMinus,
        totalPrice: state.totalPrice - action.payload.currentCost
      };
    case CLEAR_CART:
      return {
        productsInCart: [],
        totalPrice: 0,
        totalCount: 0
      };

    case DELETE_ITEM_FROM_CART:
      const newW = [];

      state.productsInCart.forEach((el) => {
        if (el.id === action.payload[0].id && el.size === action.payload[0].size && el.type === action.payload[0].type) {
          return
        } else {
          newW.push(el);
        }
      });

      const currentPizzaItemsDelete = !state.productsInCart ? [action.payload] : newW;
      return {
        ...state,
        productsInCart: currentPizzaItemsDelete,
        totalPrice: state.totalPrice - action.payload[0].currentCost * action.payload[1]
      };

    default:
      return state;
  }
}

export default cart;