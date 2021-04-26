import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItemToCart, removeItemFromCart, clearCart, deleteAllItemFromCart } from '../redux/actions';

const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, productsInCart } = useSelector((state) => state.cart);


  const getCurrentList = (productsInCart) => {
    const result = productsInCart.reduce((grouped, item) => {
      const key = `${item.id}_${item.size}_${item.type}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
      return grouped
    }, {});
    const newRes = Object.entries(result);

    const newItems = newRes.map((item) => {
      const newData = item[0].split('_');
      return (
        <div className="cart__item" key={Math.random() * 10}>
          <div className="cart__item-content">
            <div className="cart__item-img">
              <img className="cart__item-img-img" src={item[1][0].imageUrl} alt="фото продукта" />
            </div>
            <div className="cart__item-info">
              <h3>{item[1][0].name}</h3>
              <p>{newData[1]} г, {newData[2]}</p>
            </div>
          </div>
          <div className="cart__item-count">
            <div className="cart__minus icon-minus" onClick={() => handleMinus(item[1][0], item[1].length)}></div>
            <span>{item[1].length}</span>
            <div className="cart__plus icon-plus" onClick={() => handlePlus(item[1][0])}></div>
          </div>
          <div className="cart__item-price">
            {item[1][0].currentCost * item[1].length} ₽
              </div>
          <div className="cart__item-remove" onClick={() => handleDelete(item[1][0], item[1].length)}>
            <span className="icon-trash"></span>
          </div>
        </div>
      )
    });
    return newItems;
  }


  const handlePlus = (item) => {
    const choseProduct = {
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      currentCost: Number(item.currentCost),
      size: item.size,
      type: item.type
    };
    dispatch(addItemToCart(choseProduct));
    getCurrentList(productsInCart);

  };

  const handleMinus = (item, length) => {
    if (length > 1) {
      const choseProduct = {
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        currentCost: Number(item.currentCost),
        size: item.size,
        type: item.type
      };

      dispatch(removeItemFromCart(choseProduct));
      getCurrentList(productsInCart);
    }
  };


  const handleDelete = (item, length) => {
    const choseProduct = {
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      currentCost: Number(item.currentCost),
      size: item.size,
      type: item.type
    };
    dispatch(deleteAllItemFromCart(choseProduct, length));
    getCurrentList(productsInCart);
  }

  const deleteAllCart = () => {
    if (window.confirm('Вы действительно хотите очистить корзину?')) {
      dispatch(clearCart())
    }
  }

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__inner">
          <h2 className="cart__title">Корзина</h2>
          {totalPrice ?
            <React.Fragment>
              <div className="cart__clear" onClick={deleteAllCart}>
                <span className="icon-trash"></span>
                <span>Очистить корзину</span>
              </div>
              <div className="cart-box">
                <div className="content__items">
                  {getCurrentList(productsInCart)}
                </div>
                <div className="cart__total ">
                  <div className="cart__total-inner">
                    <h3 className="cart__total-title">
                      Оформить заказ
              </h3>
                    <div className="cart__total-price cart__total-row">
                      Стоимость заказа <span>{totalPrice} руб</span>
                    </div>
                    <div className="cart__total-price cart__total-row">
                      Стоимость доставки <span>0 руб</span>
                    </div>
                    <div className="cart__total-total cart__total-row">
                      Итого <span>{totalPrice} руб</span>
                    </div>
                    <a href="#" className="cart__total-btn button">Оформить</a>
                  </div>
                </div>
              </div>
            </React.Fragment>
            : <div className="cart-empty__info empty-info">
              <div className="empty-info__img">
                <img src="images/plate-empty.png" alt="пустая тарелка" />
              </div>
              <h3 className="empty-info__title">
                Ваша корзина пока пуста
                </h3>
              <Link to='/' className='button empty-info__btn'>
                На главную
              </Link>
            </div>
          }
        </div>
      </div>
    </section>
  )
}

export default Cart;
