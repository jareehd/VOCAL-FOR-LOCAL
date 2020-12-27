import React ,{useState,useEffect} from 'react'
import axios from 'axios'

import * as AllPostsLink from "../Constant";

const LandingPage = () => {
    
  useEffect(()=>{
    
    const url = AllPostsLink.Link.baseUrl.AllPostsUrl;
    const Axios = axios.create({
      baseURL:url,
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
})
   
  return 'loading' ? <h1> Loading... </h1> : (
    <section className="cards" style={{backgroundColor:"black",padding:'1.6rem'}}>
    
    <h1 style={{color:'white'}}> Posts</h1>


    </section>
  )
}

export default LandingPage