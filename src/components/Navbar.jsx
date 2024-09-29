import React, { useState } from "react";
import "../styles/navbar.css";
import bookmark from "../assets/bookmark.png";
import burger from "../assets/burger.png";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import AddStory from "./AddStory";

function Navbar({ user, setUser }) {
  const [logoutDiv, setLogoutDivVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [addStoryVisible, setAddStoryVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setLogoutDivVisible(!logoutDiv);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setLoginVisible(!loginVisible);
  };
  const handleRegisterClick = () => {
    navigate("/register");
    setRegisterVisible(!registerVisible);
  };
  const handleAddStoryClick = () => {
    navigate("/addStory");
    setAddStoryVisible(!addStoryVisible);
  };

  return (
    <>
      <div className="navbar">
        {user === null ? (
          <>
            <div
              className="pill"
              id="register"
              onClick={() => {
                handleRegisterClick();
              }}
            >
              Register Now
            </div>
            <div
              className="pill"
              id="sign-in"
              onClick={() => {
                handleLoginClick();
              }}
            >
              Sign in
            </div>
            {registerVisible && (
              <Register
                registerVisible={registerVisible}
                setRegisterVisible={setRegisterVisible}
                setUser={setUser}
              />
            )}
            {loginVisible && (
              <Login
                loginVisible={loginVisible}
                setLoginVisible={setLoginVisible}
                setUser={setUser}
              />
            )}
          </>
        ) : (
          <>
            <div className="pill" id="register">
              <img src={bookmark} alt="bookmark" />
              Bookmark
            </div>
            <div
              className="pill"
              id="register"
              onClick={() => {
                handleAddStoryClick();
              }}
            >
              Add story
            </div>
            <img
              src="https://t3.ftcdn.net/jpg/01/97/11/64/360_F_197116416_hpfTtXSoJMvMqU99n6hGP4xX0ejYa4M7.jpg"
              alt="userPort"
              className="userPort"
              style={{
                objectFit: "contain",
              }}
            />
            <img
              src={burger}
              alt="burger"
              className="burger"
              style={{ width: 18, height: 12, marginRight: 31 }}
              onClick={handleLogoutClick}
            />

            {addStoryVisible && (
              <AddStory
                setAddStoryVisible={setAddStoryVisible}
                addStoryVisible={addStoryVisible}
                user={user}
              />
            )}

            {logoutDiv ? (
              <div className="logoutDiv">
                {user.username}
                <div
                  className="pill"
                  id="register"
                  onClick={() => {
                    setUser(null);
                  }}
                >
                  Logout
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
