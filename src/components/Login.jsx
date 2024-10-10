import React, { useState } from "react";
import "../styles/register.css";
import eye from "../assets/eye.png";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCurrUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [eyeOpen, setEyeOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    const credentials = {
      username,
      password,
    };

    try {
      const data = await axios.post(loginRoute, credentials);
      navigate("/");
      dispatch(setCurrUser(data.data.payload));
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
              navigate("/");
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
          <div className="pass">
            <input
              placeholder="Enter password"
              type={eyeOpen ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
            />
            <FontAwesomeIcon
              icon={!eyeOpen ? faEye : faEyeSlash}
              onClick={() => {
                setEyeOpen(!eyeOpen);
              }}
            />
          </div>
        </div>
        <div className="error">{error && "Please enter valid username"}</div>
        <div className="pill" onClick={handleRegister}>
          Login
        </div>
      </div>
    </div>
  );
}

export default Login;
