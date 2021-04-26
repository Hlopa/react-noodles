import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import { Main, Cart } from './pages';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="main">
        <Route path='/' exact component={Main}/>
        <Route path='/cart' exact component={Cart}/>
      </div>
    </React.Fragment>
  )
}

export default App;
