import React, { useState } from "react";
import "../styles/navbar.css";
import bookmark from "../assets/bookmark.png";
import burger from "../assets/burger.png";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import CreateStory from "./CreateStory";

function Navbar({ user, setUser, bookmarkClicked, handleBookmarkClick }) {
  const [logoutDiv, setLogoutDivVisible] = useState(false);
  const [addStoryVisible, setAddStoryVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setLogoutDivVisible(!logoutDiv);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
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
          </>
        ) : (
          <>
            <div className="pill" id="register" onClick={handleBookmarkClick}>
              {bookmarkClicked ? (
                "Home"
              ) : (
                <>
                  <img src={bookmark} alt="bookmark" />
                  Bookmarks
                </>
              )}
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
              <CreateStory
                setAddStoryVisible={setAddStoryVisible}
                addStoryVisible={addStoryVisible}
                user={user}
                setUser={setUser}
              />
            )}

            {logoutDiv ? (
              <div className="logoutDiv">
                {user.username}
                <div
                  className="pill"
                  id="register"
                  onClick={() => {
                    setLogoutDivVisible(!logoutDiv)
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
