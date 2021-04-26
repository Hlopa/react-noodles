import {combineReducers } from 'redux';
import filters from './filters';
import getProducts from './getProducts';
import cart from './cart';

const rootReducer = combineReducers({
  filters,
  getProducts,
  cart
});

export default rootReducer;