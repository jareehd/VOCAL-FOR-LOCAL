import React, { Component } from "react";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { Redirect } from 'react-router'
import { LockRounded } from "@material-ui/icons";
import "./UpdateProfile.css";
import axios from "axios";
import * as UpdateProfileLink from "../Constant";
import imageCompression from 'browser-image-compression'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
           
export class UpdateProfile extends Component {

  // constructor(props){
  //   super(props)
  //   this.imageHandler = this.imageHandler.bind(this)
  //   this.handleCropImage = this.handleCropImage.bind(this)
  // }

  state = {
    profileImg:null,
    profileImgUrl:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    croppedImgUrl:null,
    firstName: null,
    lastName: null,
    age: null,
    sex: null,
    location: null,
    password: null,
    confirmPassword: null,
    cropProcess:0,  // o when no image selected ,1 when image is on crop , 2 when we have cropped the image
    redirect:false,
    crop: {
      unit: 'px', 
      x: 50,
      y: 50,
      width: 100,
      aspect: 4 / 3
    }
  };
 
  imageHandler = async (image) => {
    var options = {
      maxSizeMB: 0.2
    }
    const output = await imageCompression(image, options)
    this.setState({profileImg:output})
    this.setState({profileImgUrl:URL.createObjectURL(output)})
  };

  handleCropImage = async (e) => {
    const image = e.target.files[0]
    this.setState({
      cropProcess:1,
      profileImg:image,
      croppedImgUrl:URL.createObjectURL(image)
    })
  }
  
  onCropChange = (crop) => {
    this.setState( () =>{
     return {crop:crop} 
    });
    this.getCroppedImg(crop);
  }

  onCropComplete =  crop  => {
      this.setState({cropProcess:2});
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
            
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    let profileImg = new File([u8arr], filename, {type:mime});
    this.imageHandler(profileImg)
  }

  getCroppedImg( crop) {
  const image = new Image()
  image.src = this.state.croppedImgUrl 
  // const aspect  = this.state.aspect
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.width *0.75 ;
  const ctx = canvas.getContext("2d");
  
  // console.log(crop)

  ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.width  * scaleY * 0.75,
      0,
      0,
      crop.width,
      crop.width * 0.75
   );
  
  const reader = new FileReader()
  canvas.toBlob(blob => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
          this.dataURLtoFile(reader.result, 'cropped.jpg')
      }
    })
  } 

  submit = (e) => {
    if (this.state.password !== this.state.confirmPassword)
      alert("Password did not match");
    else {
      let formData = new FormData();
      if ( this.state.profileImg !== null) {
        formData.append("avatar", this.state.profileImg);
      }
      if (this.state.firstName !== null) {
        formData.append("firstname", this.state.firstName);
      }
      if (this.state.lastName !== null) {
        formData.append("lastname", this.state.lastName);
      }
      if (this.state.age !== null) {
        formData.append("age", this.state.age);
      }
      if (this.state.location !== null) {
        formData.append("location", this.state.location);
      }
      if (this.state.sex !== null) {
        formData.append("sex", this.state.sex);
      }
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = UpdateProfileLink.Link.baseUrl.UpdateProfileUrl;

      axios
        .patch(url, formData, config)
        .then((response) => {
          this.setState({
            redirect:true
          })
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    const { profileImg , profileImgUrl ,cropProcess ,crop,croppedImgUrl } = this.state;
    if(this.state.redirect)
    {
      return <Redirect push to="/profile" />;
    }
    else if(cropProcess == 1 ){
      return (
      <div>
      <ReactCrop
                  src={croppedImgUrl} 
                  crop = {crop}
                  onChange={this.onCropChange}
      /> 
                 
          <Button
          color="primary"
          variant="contained"
          onClick={this.onCropComplete }
          >
          Crop
      </Button>
    </div>
      )
    } 
    else {
    return (
      <div className="Updatepage">
        <div className="Updatecontainer">
          <h1 className="Updateheading">Update Profile</h1>
          <div className="Updateimg-holder">
           <img src={profileImgUrl} alt="" id="Updateimg" className="Updateimg" /> 
            
          </div>

          <input
            type="file"
            accept="image/*"
            name="image-upload"
            id="Updateinput"
            onChange = {this.handleCropImage} 
            // {this.imageHandler}
          />


          <div className="Updatelabel">
            <Button variant="contained">
              <label className="Updateimage-upload" htmlFor="Updateinput">
                Choose your Photo
              </label>
            </Button>
          </div>
          <Grid
            container
            item
            // xs={12}
            // sm={6}
            // md={4}
            alignItems="center"
            direction="column"
            justify="space-between"
            style={{ padding: 10 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 400,
                minWidth: 300,
              }}
            >
              <TextField
                label="First Name"
                margin="normal"
                onChange={(event) => {
                  this.setState({ firstName: event.target.value });
                }}
              />
              <TextField
                label="Last Name"
                margin="normal"
                onChange={(event) => {
                  this.setState({ lastName: event.target.value });
                }}
              />
              <TextField
                label="Location"
                margin="normal"
                onChange={(event) => {
                  this.setState({ location: event.target.value });
                }}
              />
              <TextField
                label="Sex"
                margin="normal"
                onChange={(event) => {
                  this.setState({ sex: event.target.value });
                }}
              />
              <TextField
                label="Age"
                margin="normal"
                onChange={(event) => {
                  this.setState({ age: event.target.value });
                }}
              />
              <TextField
                label="Password"
                margin="normal"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
              <TextField
                label="Confirm Password"
                margin="normal"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  this.setState({ confirmPassword: event.target.value });
                }}
              />
              <div style={{ height: 20 }} />
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => this.submit(e)}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </div>
      </div>
    )
    }
  }
}

export default UpdateProfile;