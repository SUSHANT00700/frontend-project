import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { setCurrUser } from "../store/userSlice.js";
import "../styles/home.css";
import FrontPage from "../components/FrontPage.jsx";
import Bookmarks from "../components/Bookmarks.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const setUser = (obj) => {
    dispatch(setCurrUser(obj));
  };

  const [bookmarkClicked,setBookmarkClicked] = useState(false)

  const handleBookmarkClick = ()=>{
    if(bookmarkClicked){
      navigate("/")
      setBookmarkClicked(false)
    }else{
      setBookmarkClicked(true)
      navigate("/bookmark")
    }
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} bookmarkClicked={bookmarkClicked} handleBookmarkClick={handleBookmarkClick} />
      {bookmarkClicked?<Bookmarks/>:<FrontPage/>}
    </>
  );
}

export default Home;
