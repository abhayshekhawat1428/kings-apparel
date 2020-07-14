import React from 'react';
import {HomePage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {Switch, Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

const HatsPage = () =>(
  <div>
    <h1>HATS PAGE!!!</h1>
  </div>
)

class App extends React.Component {

  unsubscribeFromAuth =null;
  componentDidMount(){

    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){ 
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>{
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
          })
      }
      else{
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header />{/* We keep this header outside the switch which 
        makes it always present despite what route we are on */}
        <Switch>
          <Route exact path='/' component ={HomePage}/>
          <Route path='/shop' component ={ShopPage}/>  
          <Route exact path='/signin' render = {() =>this.props.currentUser ?(<Redirect to = '/'/>) :(<SignInAndSignUpPage/>) }/> 
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = ({user}) =>({
  currentUser : user.currentUser
})


const mapDispatchToProps= (dispatch) =>({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,
                      mapDispatchToProps)(App);
