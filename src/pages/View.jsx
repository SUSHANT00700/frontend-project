import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addLike,
  bookmarkRoute,
  removeBookmarkRoute,
  storyRoutes,
} from "../utils/APIRoutes";
import axios from "axios";
import "../styles/view.css";
import share from "../assets/share.png";
import cross from "../assets/cross.png";
import { useDispatch, useSelector } from "react-redux";
import { setCurrUser } from "../store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as faBookmarkRegular,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarkSolid,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function View() {
  const params = useParams();
  const [storyID, setStoryID] = useState("");
  const [story, setStory] = useState(null);
  const [currSlide, setcurrSlide] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

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
        toast(error);
      }
    };
    fetchData();
  }, [storyID]);

  useEffect(() => {
    if (user === null) return;
    if (user.bookmarks.indexOf(storyID) !== -1) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }

    if (user.likedStories.indexOf(storyID) !== -1) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [storyID, user]);

  const handleSlideChange = (num) => {
    if (currSlide === 0 && num === -1) toast("Invalid Operator");
    else if (currSlide === story.slides.length - 1 && num === 1)
      toast("Invalid Operator");
    else {
      setcurrSlide(currSlide + num);
    }
  };

  const handleCrossClick = () => {
    navigate(-1);
  };

  const handleShareClick = () => {
    navigator.clipboard
      .writeText(location.pathname)
      .then(() => {
        toast("Copied the URL");
      })
      .catch((err) => {
        toast("some error occured");
      });
  };

  const handleBookmarkClick = async () => {
    if (user === null) toast("Please login first");
    else {
      if (!bookmarked) {
        try {
          if (user.bookmarks.indexOf(storyID) !== -1) {
            toast("Already bookmarked");
          }
          const response = await axios.post(bookmarkRoute, {
            story_id: storyID,
            user_id: user._id,
          });
          dispatch(setCurrUser(response.data.payload));
          toast("Bookmark Added")
        } catch (error) {
          toast(error);
        }
      } else {
        try {
          const response = await axios.post(removeBookmarkRoute, {
            story_id: storyID,
            user_id: user._id,
          });
          dispatch(setCurrUser(response.data.payload));
          toast("Bookmark Removed")
        } catch (error) {
          toast(error);
        }
      }
    }
  };

  const handleLikeClick = async ()=>{
    if(user === null)
        toast("Please Login First")
    else{
      try {
        const response = await axios.post(addLike,{
          story_id:storyID,
          user_id:user._id,
          inc:liked?-1:1
        })
  
        dispatch(setCurrUser(response.data.payload.updatedUser))
        setStory(response.data.payload.updatedStory)
      } catch (error) {
        toast("Something went wrong")
      }
    }
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {story && (
        <div className="outer">
          <div className="storyContainer">
            <div
              className="sign"
              onClick={() => {
                handleSlideChange(-1);
              }}
            >
              {"<"}
            </div>
            <div className="story">
              <img
                src={story.slides[currSlide].imgURL}
                className="bgimg"
                alt="bgimg"
              />
              <div className="slides">
                {story.slides.map((_, idx) => (
                  <div
                    className={idx <= currSlide ? "active btns" : "btns"}
                  ></div>
                ))}
              </div>
              <div className="buttonsStory">
                <img
                  src={cross}
                  onClick={() => handleCrossClick()}
                  className="cross"
                  alt="cross"
                />
                <img
                  src={share}
                  onClick={() => handleShareClick()}
                  className="share"
                  alt="share"
                />
              </div>
              <div className="bottom">
                <div className="text">
                  <p>{story.slides[currSlide].heading}</p>
                  <p>{story.slides[currSlide].description}</p>
                </div>
                <div className="buttonsStory">
                  <div className="bookmark">

                  <FontAwesomeIcon
                    icon={bookmarked ? faBookmarkSolid : faBookmarkRegular}
                    size="2x"
                    onClick={handleBookmarkClick}
                  />
                  </div>
                  <div className="likes">
                  <FontAwesomeIcon
                    icon={liked ? faHeartSolid : faHeartRegular}
                    size="2x"
                    onClick={handleLikeClick}
                  />
                  {story.likes}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="sign"
              onClick={() => {
                handleSlideChange(1);
              }}
            >
              {">"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default View;
