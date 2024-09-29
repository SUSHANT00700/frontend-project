import React, { useState } from "react";
import "../styles/register.css";
import eye from "../assets/eye.png";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ loginVisible, setLoginVisible, setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [eyeOpen, setEyeOpen] = useState(false);

  const handleRegister = async () => {
    const credentials = {
      username,
      password,
    };

    try {
      const data = await axios.post(loginRoute, credentials);
      navigate("/");
      setLoginVisible(!loginVisible);
      setUser(data.data.payload);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="outer">
      <div className="register">
        <div className="closeButtonContainer">
          <div
            className="close-button"
            onClick={() => {
              setLoginVisible(!loginVisible);
            }}
          ></div>
        </div>
        <div className="heading">login</div>
        <div className="username">
          Username
          <input
            className="input"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError(false);
            }}
          />
        </div>
        <div className="username">
          Password
          <input
            placeholder="Enter password"
            type={eyeOpen ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
          />
          <img alt="eye" src={eye} onClick={() => setEyeOpen(!eyeOpen)} />
        </div>
        <div className="error">
          {error && "Please enter valid username"}
        </div>
        <div className="pill" onClick={handleRegister}>
          Login
        </div>
      </div>
    </div>
  );
}

export default Login;
