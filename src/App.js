import React from 'react';
import {HomePage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {Switch, Route} from 'react-router-dom';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

const HatsPage = () =>(
  <div>
    <h1>HATS PAGE!!!</h1>
  </div>
)

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      currentUser : null
    }
  }

  unsubscribeFromAuth =null;
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){ 
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>{
          this.setState({
            currentUser:{
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        });
      }
      else{
        this.setState({currentUser:null})
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header currentUser ={this.state.currentUser}/>{/* We keep this header outside the switch which 
        makes it always present despite what route we are on */}
        <Switch>
          <Route exact path='/' component ={HomePage}/>
          <Route path='/shop' component ={ShopPage}/>  
          <Route path='/signin' component ={SignInAndSignUpPage}/> 
        </Switch>
      </div>
    );
  }
}

export default App;
