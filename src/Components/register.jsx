import React, { Component } from "react";
import "./../Styles/login.css";
import Button from "@material-ui/core/Button";


class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      name : "",
      pass : "",
      error: ""
    };
  }

  swap = () =>{
    window.location.href = "/";
  }

  handleSubmit = (event)=>{
    if(this.state.name === "" && this.state.pass === ""){
      this.setState({
        name: this.state.name,
        pass : this.state.pass,
        error : "*Enter Username and Password"
      })
    }
    else{
    
      let url = "https://instagram-clone-123.herokuapp.com/auth/register";
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
        if(res.message === 'User Added'){
          fetch(url,otherParams)
          .then(data=>data.json())
          .then(res=>{
            if(res.message === "Login Successful"){
              window.localStorage.setItem("token",res.token); 
              window.location.replace("/home");
            }else{
              console.log("Error");
            }
          })
          .catch(err=>console.log("error",err))
        }
        else if(res.message === 'User not Added'){
          this.setState({
            name: this.state.name,
            pass : this.state.pass,
            error : "*Error! retry please..."
          })
        }
        else if(res.message === 'username is taken'){
          this.setState({
            name: this.state.name,
            pass : this.state.pass,
            error : "*Username Taken"
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
          
          <Button className="log-button" variant="contained" type="submit" value="Submit">Sign Up</Button>
            <hr/>
          <Button className="reg-button" variant="contained" onClick={this.swap}>Already have an account?</Button>
    </form>
      
    );
  };
}

export default Register;
