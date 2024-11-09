import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

//const [data, setData] = useState();



// connecting backend with frontend

const getData = async()=>{
  const response = await axios.get('http://localhost:8080/getdata')
  //setData(response.data)
  console.log(response.data)
}

useEffect(()=>{
  getData()
},[])


  return (
    <>
      <div className='container'>
        <h1>React app</h1>
      </div>
    </>
  )
}

export default App
