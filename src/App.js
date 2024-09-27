import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import squareData from './assets/topic.json'
import Square from "./components/Square";
import './styles/app.css'

function App() {

  const [user,setUser] = useState(null)
  
  useEffect(()=>{
    setUser({
      name:'amol',
      portfolio:
        "https://photo-cdn2.icons8.com/JE7GEYmlaPP0peO3CR-bmkbpURpBiNzSmfWSBnKAkjk/rs:fit:715:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi9jNGFmODM2N2Fh/ZWU0MWNiOGQ3ODYy/MjgxNzgxMjc2OS5q/cGc.jpg",
    });
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
  );
}

export default App;
