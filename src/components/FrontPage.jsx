import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CATEGORIES } from "../utils/constants";
import { storyRoutes } from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import squareData from "../assets/topic.json";
import StoryCard from "./StoryCard";

function FrontPage() {
  const user = useSelector((state) => state.user.user);
  const [frontData, setFrontData] = useState({
    food: [],
    "health and fitness": [],
    travel: [],
    movies: [],
    education: [],
  });

  const [selected, setSelected] = useState("All");

  const handleCategorySelection = (cat) => {
    setSelected(cat);
  };

  const navigate = useNavigate();

  const fetchData = async (payload) => {
    const response = await axios.post(storyRoutes + "/getFirstFour", payload);
    return response.data;
  };

  const handleStoryClick = (storyID) => {
    navigate(`/view/${storyID}`);
  };

  useEffect(() => {
    const fetchAlldata = async () => {
      for (let c of CATEGORIES) {
        try {
          const data = await fetchData({ category: c });
          if (data.size > 0) addUniqueItems(c, data.payload);
        } catch (error) {
          toast(error);
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
      <div className="squareDiv">
        {squareData.map((data, key) => {
          return (
            <Square
              data={data}
              key={key}
              selected={selected}
              handleCategorySelection={handleCategorySelection}
            />
          );
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
                  <div
                    className="storyContainer"
                    onClick={() => handleStoryClick(data)}
                  >
                    <StoryCard data={{ _id: data }} key={idx} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {CATEGORIES.map((c) => {
        if (selected === c || selected === "All") {
          return (
            <div className="category">
              <div className="title">Top Stories About {c}</div>
              <div className="data">
                {frontData[c].length === 0 ? (
                  <div className="noStory">No Stories Available</div>
                ) : (
                  <div className="stories">
                    {frontData[c].map((data, idx) => (
                      <div
                        className="storyContainer"
                        onClick={() => handleStoryClick(data._id)}
                      >
                        <StoryCard data={data} key={idx} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        }
        return (<></>)
      })}
    </>
  );
}

export default FrontPage;
