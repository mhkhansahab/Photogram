import React, { Component } from 'react';
import "./../Styles/profile.css";
import "./../Styles/modal.css";
import _1 from "./../Assets/Avatars/1.png";
import _2 from "./../Assets/Avatars/2.png";
import _3 from "./../Assets/Avatars/3.png";
import _4 from "./../Assets/Avatars/4.png";
import _5 from "./../Assets/Avatars/5.png";

class Profile extends Component{
    state = {
        status: false,
        posts: [],
        avatar : window.localStorage.getItem("avatar"),
        info : null
    }

    componentDidMount(){
        let url = "https://instagram-clone-123.herokuapp.com/auth/get_all_my_post";
        let otherParams = {
            method: "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({token : window.localStorage.getItem("token")})
        }

        fetch(url,otherParams)
        .then(data=>data.json())
        .then(res=>{
            this.setState({
                posts: res
            })
        })
        .catch(err=>console.log(err))

        let info_url = "https://instagram-clone-123.herokuapp.com/auth/get_info";
        let info_otherParams = {
            method: "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({token : window.localStorage.getItem("token")})
        }

        fetch(info_url,info_otherParams)
        .then(data=>data.json())
        .then(res=>{
            if(res.avatar === 1){
                this.setState({
                    avatar : _1,
                    info : res.username
                })
            }
            else if(res.avatar === 2){
                this.setState({
                    avatar : _2,
                    info : res.username
                })
            }
            else if(res.avatar === 3){
                this.setState({
                    avatar : _3,
                    info : res.username
                })
            }
            else if(res.avatar === 4){
                this.setState({
                    avatar : _4,
                    info : res.username
                })
            }
            else{
                this.setState({
                    avatar : _5,
                    info : res.username
                })
            }  
        })
        .catch(err=>console.log(err))

        
    }
  
    gotoHome=()=>{
        window.location.href = "/home";
    }

    logout = ()=>{
        window.localStorage.clear();
        window.location.replace("/");
    }
    displayModal=()=>{    
    this.setState({
        status: true,
    })
    }
    closeModal=()=>{
        this.setState({
            status: false
        })
    }

    avatarReturn = ()=>{
        if(this.state.avatar === "1"){
            return _1;
        }
        else if(this.state.avatar === "2"){
            return _2;
        }
        else if(this.state.avatar === "3"){
            return _3;
        }
        else if(this.state.avatar === "4"){
            return _4;
        }
        else{
            return _5;
        }
    }

    deletePost=(id)=>{
        let post = this.state.posts;
        let url = "https://instagram-clone-123.herokuapp.com/post/deletepost";
        let otherParams = {
            method: "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                post_id : id,
                token : window.localStorage.getItem("token")
            })
        }

            fetch(url,otherParams)
            .then(data=>data.json())
            .then(res=>{
                post.map((element, i)=>{
                    if(element._id === res._id){
                        post.splice(i,1);
                        this.setState({
                            posts : post
                        })
                    }
                    return 0;
                })
            })
            .catch(err=>console.log(err))
    }

    changeAvatar=(avatar)=>{
        let url = "https://instagram-clone-123.herokuapp.com/auth/change_profile";
        let otherParams = {
            method: "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                avatar : avatar,
                token : window.localStorage.getItem("token")
            })
        }

            fetch(url,otherParams)
            .then(data=>data.json())
            .then(res=>{
               console.log(res);
            })
            .catch(err=>console.log(err))
    }

    render(){
        return(
            <div className="mainProfile">
                {this.state.status ? 
                <div className="mainModal" onClick={this.closeModal}>
                    <div className="avatarslist">
                        <div className="heading">Select an Avatar</div>
                        <br/>
                        <div className="mainAvatars">
                        <img src={_1} alt="avatar" onClick={()=>this.changeAvatar("1")} className="avatars"></img>
                        <img src={_2} alt="avatar" onClick={()=>this.changeAvatar("2")} className="avatars"></img>
                        <img src={_3} alt="avatar" onClick={()=>this.changeAvatar("3")} className="avatars"></img>
                        <img src={_4} alt="avatar" onClick={()=>this.changeAvatar("4")} className="avatars"></img>
                        <img src={_5} alt="avatar" onClick={()=>this.changeAvatar("5")} className="avatars"></img>
                        </div>
                        
                    </div>
                </div>
                : ""
                }
                <div className="pnav">
                    <span className="ptitle" onClick={this.gotoHome}>Photogram</span>
                    <img src= {this.state.avatar} alt="Avatar" className="pavatar" onClick={this.displayModal}/>
                    <span className="pname">{!null ? this.state.info : "none"}</span>
                    <button className="plogout" onClick = {this.logout}>Logout</button>
                </div>
                
                <div className="mainpBody">
                <div className="note">Double tap to delete</div>
                {
                    this.state.posts === [] ? <h1 className="nopost">No Post Available</h1>
                    :
                    this.state.posts.map(element=>{
                       return( 
                       <div className="postDiv" onDoubleClick={()=>this.deletePost(element._id)} key = {element._id}>
                            <img src={element.url} alt="post" className="postimg"/>
                            <div className="innerDiv">
                                <img src={this.avatarReturn()} alt="Avatar" className="postavatar"/>
                                <span className="posttitle">{element.postby}</span>
                            </div>
                            <div className="innerbottom">
                                <div className="like">Likes : {element.likes}</div>
                                <div className="comment">- {element.description}</div>
                            </div>
                        </div>)
                    })
                    }

                </div>
            </div>
        );
    };
}

export default Profile;