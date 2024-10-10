import axios from "axios";
import React, { useEffect, useState } from "react";
import { storyRoutes } from "../utils/APIRoutes";
import "../styles/storyCard.css";
import { toast } from "react-toastify";

function StoryCard({ data }) {
  const [story, setStory] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          storyRoutes + "getPartial/" + data._id
        );
        setStory(response.data.payload);
      } catch (error) {
        toast(error);
      }
    };
    loadData();

  }, [data]);

  return (
    <>
      {story && (
        <div className="storyCard" key={story._id}>
          <div className="top"></div>
          <img src={story.firstSlide.imgURL} alt="storySlide" />
          <div className="storyData">
            <p className="heading">{story.firstSlide.heading}</p>
            <p className="description">{story.firstSlide.description}</p>
          </div>
          <div className="bottom"></div>
        </div>
      )}
    </>
  );
}

export default StoryCard;
