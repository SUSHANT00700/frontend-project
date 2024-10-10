import React, { useState } from "react";
import "../styles/register.css";
import eye from "../assets/eye.png";
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCurrUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

function Register() {

  const navigate = useNavigate()
  const [username,setUsername]  = useState("");
  const [password,setPassword] = useState("");

  const [eyeOpen,setEyeOpen] = useState(false)
  const dispatch = useDispatch()

  const handleRegister = async()=>{
    const newUser = {
      username,
      password,
    }
    const data = await axios.post(registerRoute,newUser)
    navigate("/")
    
    dispatch(setCurrUser(data.data.payload))
  }

  return (
    <div className="outer">
      <div className="register">
        <div className="closeButtonContainer">
          <div className="close-button" onClick={()=>{
            navigate("/")
          }}></div>
        </div>
        <div className="heading">Register</div>
        <div className="username">
          Username
          <input className="input" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className="username">
          Password
            <input placeholder="Enter password" type={eyeOpen?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <img alt="eye" src={eye} onClick={()=>setEyeOpen(!eyeOpen)}/>
        </div>
        <div className="pill" onClick={handleRegister}>Register</div>
      </div>
    </div>
  );
}

export default Register;
