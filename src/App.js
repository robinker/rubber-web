import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import Home from './pages/Home';
import Profile from './pages/Profile';
import Management from './pages/Management';
import ManageProfile from './pages/ManageProfile';
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'

function App() {
  return (
    <div>
        <BrowserRouter>
          <Header role={'admin'}></Header>
          <div>
            <Route path="/" exact component={Home}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/management/profile" exact component={ManageProfile}/>
            <Route path="/management/profile/add" exact component={RegisterForm}/>
            <Route path="/management" exact component={Management}/>
          </div>
        </BrowserRouter>
    </div>
    
  );
}

export default App;
