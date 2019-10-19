import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Home}/>
            <Route path="/profile" exact component={Profile}/>
          </div>
        </BrowserRouter>
    </div>
    
  );
}

export default App;
