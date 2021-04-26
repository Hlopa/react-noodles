import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Category from '../components/Category';
import Sort from '../components/Sort';
import ProductsList from '../components/ProductsList';
import { setCategory, setSortBy, fetchPizzas, addItemToCart } from '../redux/actions';


const categoryNames = ['Яичная', 'Гречневая', 'Рисовая', 'Пшеничная'];

const sortNames = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price-min' },
  { name: 'алфавиту', type: 'name' }
];

const Main = () => {
  const dispatch = useDispatch();
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const {items} = useSelector(({ getProducts }) => getProducts);

  const selectCategory = (index) => {
    dispatch(setCategory(index))
  };

  const handleChangeSortType = (type) => {
    dispatch(setSortBy(type))
  };

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy))
  }, [category, sortBy]);

  const addProductToCart = (obj) => {
    dispatch(addItemToCart(obj))
  }

  return (
    <section className="products">
      <div className="container">
        <div className="products__inner">
          <div className="products__header">
            <Category
              items={categoryNames}
              onClickItem={selectCategory}
              activeCategory={category} />
            <Sort items={sortNames} onChangeSortType={handleChangeSortType} activeCategory={sortBy}/>
          </div>
          <div className="products__main">
          <ProductsList items={items} handleChoseProduct={addProductToCart}/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Main
