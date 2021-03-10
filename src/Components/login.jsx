import React, { Component } from "react";
import "./../Styles/login.css";
import Button from "@material-ui/core/Button";


class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      name : "",
      pass : "",
      error: ""
    };
  }

  componentDidMount(){
    if (window.localStorage.getItem("token") != null){
      window.location.replace("/home");
    }
  }

  swap = () =>{
    window.location.href = "/register";
  }

  handleSubmit = (event)=>{
    if(this.state.name === "" || this.state.pass === ""){
      this.setState({
        name: this.state.name,
        pass : this.state.pass,
        error : "*Enter Username and Password"
      })
    }
    else{
      let avatar_url = "https://instagram-clone-123.herokuapp.com/auth/get_avatar";
      let avatarotherParams = {
        method: "POST",
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({
          username:this.state.name
        })
      }
      fetch(avatar_url,avatarotherParams)
      .then(data=>data.json())
      .then(res=>window.localStorage.setItem("avatar",res.avatar))
      .catch(err=>console.log(err))

      let url = "https://instagram-clone-123.herokuapp.com/auth/login";
      let otherParams = {
        method : "POST",
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify( {
          username : this.state.name,
          password : this.state.pass,
        })
      }

      fetch(url,otherParams)
      .then(data=>data.json())
      .then(res=>{
        if(res.message === "Login Successful"){
          window.localStorage.setItem("token",res.token); 
          window.location.replace("/home");

        }else if(res.message === "Incorrect Password"){
          this.setState({
            name: this.state.name,
            pass : this.state.pass,
            error : "*Incorrect Password"
          })
        }
        else if(res.message === "user not found"){
          this.setState({
            name: this.state.name,
            pass : this.state.pass,
            error : "*Incorrect Username"
          })
        }
        else{
          console.log("Error!");
        }
      })
      .catch(error=>console.log("error",error));
      
    }
    event.preventDefault();
  }

  handleChange= (value, inp)=>{
    if(inp === "name"){
      this.setState({
        name: value,
        pass : this.state.pass,
        error: ""
      })
    }
    else{
      this.setState({
        name: this.state.name,
        pass : value,
        error: ""
      })
    }
  }

  render(){
    return(
        <form onSubmit={this.handleSubmit} className="form">
        <p>Photogram</p>
          
          <input className="textfield" value={this.state.name} type="name" placeholder="Username" onChange={(event)=>this.handleChange(event.target.value,"name")}/>
          <input className="textfield" value={this.state.pass} type="password" placeholder="Password" onChange={(event)=>this.handleChange(event.target.value,"password")}/>
          <p id = "error">{this.state.error}</p>
          <Button className="log-button" variant="contained" type="submit" value="Submit" >Sign In</Button>
        <hr/>
          <Button className="reg-button" variant="contained" onClick={this.swap}>Create New Account</Button>
    </form>
      
    );
  };
}

export default Login;
