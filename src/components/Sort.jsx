import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


const Sort = ({ items = [], onChangeSortType, activeCategory = ''}) => {
  const activeLabel = items.find(obj => obj.type === activeCategory).name;

  const sortItem = items.map((obj, index) => (
    <li
      key={`${obj.type}_${index}`}
      onClick={() => onSelectItem(obj.type)}
    >
      {obj.name}
    </li>
  )
  );

  //Опеределение закрытие/открытие меню сотрировки
  const [visiblePopup, setVisiblePopup] = useState(false);
  const sortRef = useRef();

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(sortRef.current)) setVisiblePopup(false)
  };

  const toggleVisiblePopup = () => setVisiblePopup(!visiblePopup);

  const onSelectItem = (type) => {
    onChangeSortType(type);
    setVisiblePopup(false);
  }

  return (
    <div className=" products__sort sort" ref={sortRef}>
      <div className="sort__label">
        <span className={visiblePopup ? "icon-spoon-knife icon-spoon-knife--active" : "icon-spoon-knife"}></span>
        <span className="sort-by" >Сортировка по:</span>
        <span className="sort-by-active" onClick={toggleVisiblePopup}>{activeLabel}</span>
      </div>
      {visiblePopup &&
        <div className="sort__popup">
          <ul className="sort__list">
            {sortItem}
          </ul>
        </div>
      }
    </div>
  )
};


Sort.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeSortType: PropTypes.func,
  activeCategory: PropTypes.string
};

export default Sort;
