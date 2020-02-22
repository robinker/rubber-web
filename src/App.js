import React from 'react'
import {BrowserRouter, Route, Redirect} from "react-router-dom"
import Home from './pages/Home'
import Profile from './pages/Profile'
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
        <Route path="/profile" exact component={() => <Profile user={props.user}> </Profile> }/>
        <Route path="/search" exact component={() => <Search></Search> }/>
        <Route path="/management/profile/add" exact component={RegisterForm}/>
        <Route path="/management" exact component={Management}/>
        <Route path="/sale" exact component={() => <Sale source={props.user.firstname + " " + props.user.lastname} userId={props.user._id}/>} />
        <Route path="/transactions" exact component={() => <Transaction firstname={props.user.firstname} lastname= {props.user.lastname} role={props.user.role} />} />
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
