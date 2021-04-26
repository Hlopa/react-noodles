import React from 'react';
import PropTypes from 'prop-types';

import ProductItem from './ProductItem';


const ProductsList = ({items =  [], handleChoseProduct}) => {

  if(items){
    const products = items.map((product) => (
  <ProductItem key = {product.id} {...product} handle={handleChoseProduct}/>
  ))

  return (
    <ul className="products__list">
      {products}
    </ul>
  )
  }
}

ProductsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  handleChoseProduct: PropTypes.func,
};

export default ProductsList;
