import React, { Component } from "react";
import './App.css';
import Login from "./Components/login";
import Register from "./Components/register";
import { Route, Switch } from 'react-router-dom';
import Home from "./Components/home.jsx";
import Profile from "./Components/profile.jsx";
import Upload from "./Components/upload.jsx";

class App extends Component{
  
 
  render(){
    return(
      <div className="mainDiv">
       <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} />
          <Route path="/upload" component={Upload} />
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
       </Switch>
      </div>
    
    );
  };
}


export default App;
