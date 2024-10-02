import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { bookmarkRoute, storyRoutes } from "../utils/APIRoutes";
import axios from "axios";
import '../styles/view.css'
import share from '../assets/share.png'
import cross from '../assets/cross.png'
import bookmark from '../assets/bookmark.png'
import heart from '../assets/heart.png'
import { useDispatch, useSelector } from "react-redux";
import { setCurrUser } from "../store/userSlice";

function View() {
  const params = useParams();
  const [storyID, setStoryID] = useState("");
  const [story, setStory] = useState(null);
  const [currSlide,setcurrSlide] = useState(0);
  const navigate = useNavigate();
  const location = useLocation()
  const user = useSelector((state)=>state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const value = params["*"];
    setStoryID(value.split("/")[1]);
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storyID.length > 0) {
          const response = await axios.get(
            storyRoutes + "getDetails/" + storyID
          );
          setStory(response.data.payload);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [storyID]);

  useEffect(() => {
    console.log(story);
  }, [story]);

  const handleSlideChange = (num)=>{
    if(currSlide === 0 && num === -1)
      alert("Invalid Operator")
    else if(currSlide === story.slides.length-1 && num === 1)
        alert("Invalid Operator")
    else{
      setcurrSlide(currSlide+num)
    }
  }

  const handleCrossClick = ()=>{
    navigate("/")
  }

  const handleShareClick = ()=>{
    navigator.clipboard.writeText(location.pathname).then(()=>{
      alert("Copied the URL")
    }).catch(err=>{
      alert('some error occured')
    })
  }

  const handleBookmarkClick = async()=>{
    if(user === null)
        alert("Please login first")
    else{
       try {
         if(user.bookmarks.indexOf(storyID) === -1){
            alert("Already bookmarked")
          }
         const response = await axios.post(bookmarkRoute,{story_id:storyID,user_id:user._id})
         setCurrUser(response.data.payload)
       } catch (error) {
          alert(error)
       }
    }
  }

  return (
    <>
      {story && (
        <div className="outer">
          <div className="storyContainer">
            <div className="sign" onClick={()=>{handleSlideChange(-1)}}>{"<"}</div>
            <div className="story">
              <img src={story.slides[currSlide].imgURL} className="bgimg" alt="bgimg"/>
              <div className="slides">
                {
                  story.slides.map((_,idx)=>(<div className={idx <= currSlide ? "active btns":"btns"}>
                  </div>))
                }
              </div>
              <div className="buttons">
                 <img src={cross} onClick={()=>handleCrossClick()} className="cross" alt="cross"/>
                 <img src={share} onClick={()=>handleShareClick()} className="share" alt="share"/>
              </div>
              <div className="bottom">
              <div className="text">
                <p>{story.slides[currSlide].heading}</p>
                <p>{story.slides[currSlide].description}</p>
              </div>
                <div className="buttons">
                  <img src={bookmark} onClick={()=>handleBookmarkClick()} className="bookmark" alt="bookmark"/>
                  <img src={heart} className="heart" alt="heart"/>
                </div>
              </div>
            </div>
            <div className="sign" onClick={()=>{handleSlideChange(1)}}>{">"}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default View;
