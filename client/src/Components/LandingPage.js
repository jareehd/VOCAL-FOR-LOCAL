import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import DisplayPostCard from './DisplayPostCard'
import * as AllPostsLink from "../Constant";

const LandingPage = () => {
  const [items, setItems] = useState([])
  const [loading,setLoading] =useState(true)

  useEffect(()=>{
    
    const url = AllPostsLink.Link.baseUrl.AllPostsUrl;
    const Axios = axios.create({
      baseURL:url,
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    const fetchData = async() =>{
      try{
        const result = await Axios.get()
        setItems(result.data)
        setLoading(false)
      } catch(e){
        console.log(e)
      }
    }
     fetchData()
  },[]) 
   
  return loading ? <h1> Loading... </h1> : (
    <section className="cards" style={{backgroundColor:"black",padding:'1.6rem'}}>
    
    <h1 style={{color:'white'}}> Posts</h1>

    {items.map(item => (
      <DisplayPostCard
      key={item._id}
      item={item}
      style={{marginBottom:"20px"}}
      >
      </DisplayPostCard>
      
    ))}
    </section>
  )
}

export default LandingPage