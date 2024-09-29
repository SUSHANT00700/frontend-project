import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import squareData from '../assets/topic.json'
import Square from '../components/Square'

function Home() {
    const [user, setUser] = useState(null);
    useEffect(()=>{
      setUser({
        username:"amol",
        password:"123456",
        stories:[],
        bookmarks:[]
      })
    },[])
  return (
    <>
      <Navbar user= {user} setUser = {setUser} />
      <div className="squareDiv">
        {
          squareData.map((data)=>{
            return <Square data = {data}/>
          })
        }
      </div>
    </>
  )
}

export default Home
