import React from 'react'
import {BrowserRouter, Route} from "react-router-dom"
import Home from './pages/Home'
import Profile from './pages/Profile'
import Management from './pages/Management'
import Sale from './pages/Sale'
import Transaction from './pages/Transaction'
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'
import { connect } from 'react-redux'

function App(props) {
  return (
        <BrowserRouter>
          <Header role={props.user.role} isLogged={props.user.isLogged} name={props.user.firstname + " " + props.user.lastname}></Header>
          <div>
            <Route path="/" exact component={Home}/>
            <Route path="/profile" exact component={() => <Profile user={props.user}> </Profile> }/>
            <Route path="/management/profile/add" exact component={RegisterForm}/>
            <Route path="/management" exact component={Management}/>
            <Route path="/sale" exact component={() => <Sale source={props.user.firstname + " " + props.user.lastname} userId={props.user._id} />} />
            <Route path="/transactions" exact component={() => <Transaction firstname={props.user.firstname} lastname= {props.user.lastname}/>} />
          </div>
        </BrowserRouter>
  );

}
const mapStateProps = (state) => ({
  user: state.user,
  isLogged: state.isLogged
})

export default connect(mapStateProps)(App);
