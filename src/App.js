import React from 'react'
import {BrowserRouter, Route} from "react-router-dom"
import Home from './pages/Home'
import Profile from './pages/Profile'
import Management from './pages/Management'
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'
import { connect } from 'react-redux'

function App(props) {
  return (
        <BrowserRouter>
          <Header role={props.user.role} isLogged={props.user.isLogged} name={props.user.username}></Header>
          <div>
            <Route path="/" exact component={Home}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/management/profile/add" exact component={RegisterForm}/>
            <Route path="/management" exact component={Management}/>
          </div>
        </BrowserRouter>
  );

}
const mapStateProps = (state) => ({
  user: state.user,
  isLogged: state.isLogged
})

export default connect(mapStateProps)(App);
