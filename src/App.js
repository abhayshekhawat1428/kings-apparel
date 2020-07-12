import React from 'react';
import {HomePage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component';
import {Switch, Route} from 'react-router-dom';
import './App.css';

const HatsPage = () =>(
  <div>
    <h1>HATS PAGE!!!</h1>
  </div>
)

function App() {
  return (
    <div>
      <Header/>{/* We keep this header outside the switch which 
      makes it always present despite what route we are on */}
      <Switch>
        <Route exact path='/' component ={HomePage}/>
        <Route path='/shop' component ={ShopPage}/>  
      </Switch>
    </div>
  );
}

export default App;
