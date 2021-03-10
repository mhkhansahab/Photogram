import React, { Component } from 'react';
import "./../Styles/upload.css";

class Upload extends Component{

    state = {
        selected: null,
        file: null,
        description: ""
    }
    gotoHome=()=>{
        window.location.href = "/home";
    }
    
    fileSelectedHandler = (event)=>{
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
      
         reader.onloadend = ()=>{
            this.setState({
                selected: [reader.result],
                file: event.target.files[0]
            })
          }
      }
    
    fileUploadHandler = ()=>{
        let formData = new FormData();
        formData.append("token",window.localStorage.getItem("token"));
        formData.append("img",this.state.file);
        formData.append("description",this.state.description);

        let url = "https://instagram-clone-123.herokuapp.com/post/post";
        let otherParams = {
            method : "POST",
            header : {"Content-Type":"application/json"},
            body : formData
        }

        fetch(url,otherParams)
        .then(data=>data.json())
        .then(res=>{
            alert("File Uploaded !");
            this.setState({
                description: "",
                selected: null,
                file: null,
            })
        })
        .catch(err=>console.log(err))
    }

    render(){
        return(
            <div className="page">
            <div className="mainHome">
                <div className="uploadmaintitle" onClick={this.gotoHome}>Photogram</div>
            </div>
            <div className="mainUpload">
                <p className="uploadtitle">Upload</p>
                <form className="uploadform" >
                <textarea type="text" name="text" value = {this.state.value} 
                onChange={e=>this.setState({description:e.target.value})} 
                className="caption" placeholder="What's on your mind...."/>
                
                <img src={this.state.selected} alt="" className="uploadimg"/>
                <input 
                type='file' 
                style = {{display: "none"}}
                accept="image/*"
                onChange = {this.fileSelectedHandler}
                ref={fileInput => this.fileInput = fileInput}
                />
                <button className="selector" onClick={()=>this.fileInput.click()}  type="button">Select an Image</button>
                <div className="divider"></div>
                <button className="uploader" onClick={this.fileUploadHandler} type="button">UPLOAD</button>
            </form>
            </div>
            
            </div>
            
        );
    }
}

export default Upload;