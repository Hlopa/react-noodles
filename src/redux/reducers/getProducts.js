import {
  SET_PIZZAS,
  SET_LOADING
} from '../actions/types';

const initialState = {
  items: [],
  isLoaded: false
};

const getProducts = (state = initialState, action) => {
  switch (action.type) {
    case SET_PIZZAS:
      return {
        ...state,
        items: action.payload,
        isLoaded: true
      };
    case SET_LOADING:
      return {
        ...state,
        isLoaded: action.payload
      };
    default:
      return state;
  }
}

export default getProducts;