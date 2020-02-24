import React from 'react'
import {BrowserRouter, Route, Redirect} from "react-router-dom"
import Home from './pages/Home'
import Profile from './pages/Profile'
import View from './pages/View'
import Management from './pages/Management'
import Sale from './pages/Sale'
import Search from './pages/Search'
import Transaction from './pages/Transaction'
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'
import { connect } from 'react-redux'

function App(props) {
  return (
    <BrowserRouter>
      <Header role={props.user.role} isLogged={props.user.isLogged} name={props.user.firstname + " " + props.user.lastname}></Header>
      <Route path="/" exact component={Home}/>
      {
        props.user.token === null ? <Redirect to="/"></Redirect> : <>
        <Route path="/profile" component={Profile}/>
        <Route path="/view/profile/:username" component={View}/>
        <Route path="/search"  component={Search}/>
        <Route path="/management/profile/add/:role" component={RegisterForm}/>
        <Route path="/management" exact component={Management}/>
        <Route path="/sale"  component={() => <Sale source={props.user.firstname + " " + props.user.lastname} userId={props.user._id}/>} />
        <Route path="/transactions"  component={() => <Transaction firstname={props.user.firstname} lastname= {props.user.lastname} role={props.user.role} />} />
      </>
    }
    </BrowserRouter>
  );

}
const mapStateProps = (state) => ({
  user: state.user,
  isLogged: state.isLogged
})

export default connect(mapStateProps)(App);
