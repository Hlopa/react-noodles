import React from 'react';
import PropTypes from 'prop-types';


const Category = ({ items = [], onClickItem, activeCategory = null }) => {
  
  const categoryItem = items.map((name, index) => (
    <li
      className={activeCategory === index ? 'type__item type__item--active' : 'type__item'}
      key={`${name}_${index}`}
      onClick={() => onClickItem(index)}
    >
      {name}
    </li>
  )
  );

  return (
    <div className="products__type type">
      <ul className="type__list">
        <li
          onClick={() => onClickItem(null)}
          className={activeCategory === null ? 'type__item type__item--active' : 'type__item'}
        >
          Все продукты
      </li>
        {categoryItem}
      </ul>
    </div>
  )
};

Category.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickItem: PropTypes.func,
  activeCategory: PropTypes.number
};

export default Category;
