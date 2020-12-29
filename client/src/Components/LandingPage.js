import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import DisplayPostCard from './DisplayPostCard'
import * as AllPostsLink from "../Constant";

import * as StateCity from "../StateCity";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";

const LandingPage = () => {
  const [items, setItems] = useState([])
  const [loading,setLoading] =useState(true)
  const [states,setStates] = useState( StateCity.state.states[0])
  const [city,setCity] = useState("")

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
    <Grid container>
    <Grid item xs={9}>
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
    </Grid>
    <Grid item xs={3}style={{ backgroundColor:"black",padding:'1.6rem' }} >
    <h2 style={{color:'white'}}> Select Location</h2>
    <div style={{ height: 40 }} />
              <TextField
                className="TextField"
                id="outlined-basic"
                label="State"
                
                style={{ width: "300px" ,backgroundColor:"white"}}
                select
                onChange={(e)=> setStates(e.target.value)}
              >
                {StateCity.state.states.map((state, index) => (
                  <MenuItem key={state.id} value={state} style={{backgroundColor:"white"}}>
                    {" "}
                    {state.name}{" "}
                  </MenuItem>
                ))}
              </TextField>
              <div style={{ height: 20 }} />
              <TextField
                className="TextField"
                id="outlined-basic"
                label="City"
                
                style={{ width: "300px",backgroundColor:"white" }}
                select
                onChange={(e)=> setCity(e.target.value)}
              >
                {states.districts.map((city, index) => (
                  <MenuItem key={city.id} value={city.name} style={{backgroundColor:"white"}}>
                    {" "}
                    {city.name}{" "}
                  </MenuItem>
                ))}
              </TextField>
              <div style={{ height: 20 }} />
              <Button
                color="primary"
                variant="contained"
                style={{width: "300px"}}
                
              >
                <b>Filter Posts</b>
              </Button>
    </Grid>
    </Grid>
  )
}

export default LandingPage