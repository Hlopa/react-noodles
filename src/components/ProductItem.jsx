import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


const ProductItem = ({ id, imageUrl = '', name, descr = '', spicy = false, vegan = false, price, handle}) => {

  const [activeItem, setActiveItem] = useState(false);
  const [currentCost, serCurrentCost] = useState([price[0]]);
  const [currentNumber, setCurrentNumber] = useState(0);

  const availablTypes = ['стандарт', 'двойная начинка'];
  const availableSizes = [200, 350, 400];
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const { productsInCart } = useSelector((state) => state.cart);

  const onSelectType = (index) => {
    setActiveType(index);
    if (index === 1) {
      serCurrentCost(() => {
        return Math.floor(price[activeSize] * 1.5)
      })
    } else if (index === 0) {
      serCurrentCost(price[activeSize])
    }
  };

  const onSelectSize = (index) => {
    setActiveSize(index);
    if (activeType === 1) {
      serCurrentCost(Math.floor(price[index] * 1.5));
    } else if (activeType === 0) {
      serCurrentCost(price[index]);
    }
  };

  const currentNum = (arr) => {
    let newAr = arr.filter((el) => el.id === id);
    if (newAr.length > 0) {
      return newAr.length
    } else {
      return ''
    }
  }

  const typesList = availablTypes.map((type, index) => {
    return <li
      key={type}
      onClick={() => onSelectType(index)}
      className={activeType === index ? 'active' : ''}
    >
      {type}
    </li>
  }
  );

  const sizeList = availableSizes.map((size, index) => {
    return <li
      key={size}
      onClick={() => onSelectSize(index)}
      className={activeSize === index ? 'active' : ''}
    >
      {size} см
    </li>
  }
  );

  const toggleActive = () => {
    if (!activeItem) {
      setActiveItem(true)
    }
  };


  const onAddProduct = () => {
    setActiveItem(false);

    const choseProduct = {
      id,
      name,
      imageUrl,
      currentCost: Number(currentCost),
      size: availableSizes[activeSize],
      type: availablTypes[activeType]
    };
    handle(choseProduct);
    setCurrentNumber(() => {
      return currentNumber + 1
    })
  }

  return (
    <li className={activeItem ? "products__item products__item--active" : 'products__item'} onClick={toggleActive}>
      <div className="products__img">
        <img className="products__img-img" src={imageUrl} alt="фото продукта" />
      </div>
      <div className="products__info">
        <h3 className="products__name">{name}</h3>
        <p className="products__text">{descr}</p>
        <div className="products__info-bottom info-bottom">
          <div className="info-bottom__icons">
            {spicy ? <span className="icon-fire"></span> : ''}
            {vegan ? <span className="icon-leaf"></span> : ''}
          </div>
          <div className="info-bottom__buy">
            <div className="buy">
              <span className="icon-shopping-cart"></span>
              <div className="info__bottom-total">{productsInCart.length > 0 ? currentNum(productsInCart) : ''}</div>
            </div>
            <div className="price">от {price[0]} &#8381;</div>
          </div>
        </div>
        {activeItem
          ? <React.Fragment>
            <div className="products__buy-info">
              <div className="product-hide icon-plus" onClick={() => setActiveItem(false)}></div>
              <div className="products__selector">
                <ul>
                  {typesList}
                </ul>
                <ul>
                  {sizeList}
                </ul>
              </div>
            </div>
            <div className="products__buy-bottom">
              <div className="products__buy__bottom-price">{currentCost} &#8381;</div>
              <button className="products__buy__bottom-add button" onClick={onAddProduct}>Добавить</button>
            </div>
          </React.Fragment>
          : ''}
      </div>
    </li>
  )
};

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  descr: PropTypes.string,
  spicy:  PropTypes.bool,
  vegan:  PropTypes.bool,
  price: PropTypes.arrayOf(PropTypes.number).isRequired,
  handle: PropTypes.func

};

export default ProductItem;
