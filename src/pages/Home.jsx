import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import squareData from "../assets/topic.json";
import Square from "../components/Square";
import { CATEGORIES } from "../utils/constants.js";
import axios from "axios";
import { storyRoutes } from "../utils/APIRoutes.js";
import "../styles/home.css";
import StoryCard from "../components/StoryCard.jsx";

function Home() {
  const [user, setUser] = useState(null);
  const [frontData, setFrontData] = useState({
    food: [],
    "health and fitness": [],
    travel: [],
    movies: [],
    education: [],
  });

  const fetchData = async (payload) => {
    const response = await axios.post(storyRoutes + "/getFirstFour", payload);
    return response.data;
  };

  const handleStoryClick = (storyID)=>{
    console.log(storyID)
  }

  useEffect(() => {
    const fetchAlldata = async () => {
      for (let c of CATEGORIES) {
        try {
          const data = await fetchData({ category: c });
          if (data.size > 0) addUniqueItems(c, data.payload);
        } catch (error) {
          alert(error);
        }
      }
    };
    fetchAlldata();
  }, []);

  const addUniqueItems = (category, newItems) => {
    setFrontData((prevData) => {
      const updatedSet = prevData[category];
      newItems.forEach((item) => {
        const stringifiedItem = JSON.stringify(item);
        if (
          ![...updatedSet].some(
            (existingItem) => JSON.stringify(existingItem) === stringifiedItem
          )
        ) {
          updatedSet.push(item);
        }
      });
      return {
        ...prevData,
        [category]: updatedSet,
      };
    });
  };

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="squareDiv">
        {squareData.map((data, key) => {
          return <Square data={data} key={key} />;
        })}
      </div>
      {user && (
        <div className="category">
          <div className="title">Your stories</div>
          <div className="data">
            {user.stories.length === 0 ? (
              <div className="noStory">No Stories Available</div>
            ) : (
              <div className="stories">
                {user.stories.map((data, idx) => (
                  <div className="storyContainer" onClick={()=>handleStoryClick(data)}>
                    <StoryCard data={{_id:data}} key={idx} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {CATEGORIES.map((c) => (
        <div className="category">
          <div className="title">Top Stories About {c}</div>
          <div className="data">
            {frontData[c].length === 0 ? (
              <div className="noStory">No Stories Available</div>
            ) : (
              <div className="stories">
                {frontData[c].map((data, idx) => (
                  <div className="storyContainer" onClick={()=>handleStoryClick(data._id)}>
                    <StoryCard data={data} key={idx} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;
