import axios from 'axios';

import {
  SET_CATEGORY,
  SET_SORT_BY,
  SET_PIZZAS,
  SET_LOADING,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_CART,
  DELETE_ITEM_FROM_CART
} from './types';


export const setCategory = (index) => ({
  type: SET_CATEGORY,
  payload: index
});

export const setSortBy = (type) => ({
  type: SET_SORT_BY,
  payload: type
});

export const setLoaded = boolean => ({
  type: SET_LOADING,
  payload: boolean
});

export const setPizzas = (items) => ({
  type: SET_PIZZAS,
  payload: items
});

export const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoaded(false));
  return axios.get(`/products?${category !== null ? `category=${category}` : ''}&_sort=${sortBy}&_order=asc`).then(resp => {
    dispatch(setPizzas(resp.data)
    .catch(err => {
      console.error(err);
    }));
  })
};

export const addItemToCart = (itemObj) => ({
  type: ADD_ITEM_TO_CART,
  payload: itemObj
});

export const removeItemFromCart = (itemObj) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: itemObj
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const deleteAllItemFromCart = (itemObj, length) => ({
  type: DELETE_ITEM_FROM_CART,
  payload: [itemObj, length]
})

