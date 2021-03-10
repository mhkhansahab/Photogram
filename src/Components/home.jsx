import React, { Component } from 'react';
import "./../Styles/home.css";
import _1 from "./../Assets/Avatars/1.png";
import _2 from "./../Assets/Avatars/2.png";
import _3 from "./../Assets/Avatars/3.png";
import _4 from "./../Assets/Avatars/4.png";
import _5 from "./../Assets/Avatars/5.png";
import addimg from "./../Assets/add_photo.png";

class Home extends Component{

    state={
        posts: null,
        avatar : _1
    }
    
    async componentDidMount(){
        await this.getInfo();
        await this.getPosts();
    }

    async getPosts (){
        let url = "https://instagram-clone-123.herokuapp.com/auth/get_all_post";
        let otherParams = {
            method: "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({token : window.localStorage.getItem("token")})
        }
        fetch(url,otherParams)
        .then(data=>data.json())
        .then( res=>{
            res.map(element=>{
                this.avatarReturn(element.postby)
                .then((a)=>{
                    element.avatar = a.toString();
                    this.setState({
                        posts: res
                    });
                })  
                return 0;           
            })
        })
        .catch(err=>console.log(err))
    }
    async getInfo(){
        let url = "https://instagram-clone-123.herokuapp.com/auth/get_info";
        let otherParams = {
            method: "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({token : window.localStorage.getItem("token")})
        }
        fetch(url,otherParams)
        .then(data=>data.json())
        .then(res=>{
            if(res.avatar === 1){
                this.setState({avatar: _1})
            }
            else if(res.avatar === 2){
                this.setState({avatar: _2})
            }
            else if(res.avatar === 3){
                this.setState({avatar: _3})
            }
            else if(res.avatar === 4){
                this.setState({avatar: _4})
            }
            else{
                this.setState({avatar: _5})
            }  
        })
        .catch(err=>console.log(err))
    }
    async avatarReturn(username){
        let url = "https://instagram-clone-123.herokuapp.com/auth/get_avatar";
        let otherParams = {
            method: "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({username : username})
        }
        let data = await fetch(url,otherParams)
        let res = await data.json()
            if(res.avatar === 1){
                return "1";
            }
            else if(res.avatar === 2){
                return "2";
            }
            else if(res.avatar === 3){
                return "3";
            }
            else if(res.avatar === 4){
                return "4";
            }
            else{
                return "5";
            }  
    }

    getAvatar = (value)=>{

        if(value === "1"){
            return _1;
        }
        else if(value === "2"){
            return _2;
        }
        else if(value === "3"){
            return _3;
        }
        else if(value === "4"){
            return _4;
        }
        else{
            return _1;
        }
    }

    likePost = (id)=>{
        let post = this.state.posts;
        let url = "https://instagram-clone-123.herokuapp.com/post/likepost";
        let otherParams = {
            method: "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({post_id : id})
        }

            fetch(url,otherParams)
            .then(data=>data.json())
            .then(res=>{
                post.map((element,i)=>{
                    if(element._id === res._id){
                        post[i].likes++;
                        this.setState({
                            posts:post
                        })
                    }
                    return 0;
                });
                this.setState({
                    ...this.state   
                })
            })
            .catch(err=>console.log(err))
        }
    
    render(){
        return(
            <div className="mainHome">
                <button className="addbutton"><img src={addimg} alt="addbutton" className="addimg" onClick={()=>window.location.href = "/upload"}></img></button>
                <div className="nav">
                <span className="title">Photogram</span>
                <img src = {this.state.avatar} alt="Avatar" className="avatar" onClick={()=>window.location.href = "/profile"}/>
                </div>
                
                <div className="mainBody">
                <div className="note">Double tap to like</div>
                {
                    this.state.posts === null ? <div class="loader"></div>
                    :
                    this.state.posts.map(element=>{
                       return( 
                       <div className="postDiv" onDoubleClick={()=>this.likePost(element._id)} key = {element._id}>
                            <img src={element.url} alt="post" className="postimg"/>
                            <div className="innerDiv">
                                <img src= {
                                   this.getAvatar(element.avatar)
                                } alt="Avatar" className="postavatar"/>
                                <span className="posttitle">{element.postby}</span>
                            </div>
                            <div className="innerbottom">
                                <div className="like">Likes : {element.likes}</div>
                                <div className="comment">- {element.description}</div>
                            </div>
                        </div>);
                    })
                    }
                    
                </div>
            </div>
        );
    };
}

export default Home;