import React, { useState } from "react";
import "../styles/CreateStory.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storyRoutes } from "../utils/APIRoutes";
import { CATEGORIES } from "../utils/constants";
import { validateMediaUrl } from "../utils/mediavalidator";

function CreateStory({ setAddStoryVisible, addStoryVisible, user, setUser }) {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const [currSlide, setCurrSlide] = useState(0);
  
  const [slides, setSlides] = useState([
    { heading: "", description: "", imgURL: "" },
    { heading: "", description: "", imgURL: "" },
    { heading: "", description: "", imgURL: "" },
  ]);
  
  const handleAddSlides = () => {
    if (slides.length < 6) {
      setSlides([...slides, { heading: "", description: "", imgURL: "" }]);
    } else {
      alert("Cannot exceed more than 6 slides");
    }
  };

  const handleRemoveSlide = () => {
    if (slides.length > 3) {
      const newSlides = slides.filter((_, i) => i !== slides.length - 1);
      setSlides(newSlides);
    } else {
      alert("Cannot have less than 3 slides");
    }
  };

  const handleSlideChange = (opt) => {
    if (opt === 1) {
      if (currSlide + opt < slides.length) {
        setCurrSlide(currSlide + opt);
        return;
      }
    } else if (opt === -1) {
      if (currSlide + opt >= 0) {
        setCurrSlide(currSlide + opt);
        return;
      }
    }
    alert("Invalid operator");
  };

  const validate = async () => {
    for (let slide of slides) {
      if (
        slide.heading.trim().length === 0 ||
        slide.description.trim().length === 0 ||
        slide.imgURL.trim().length === 0
      ) {
        alert("Please fill all fields");
        return;
      }
    }

    // validating media url
    for (let slide of slides){
      const result = await validateMediaUrl(slide.imgURL)
      if(result.valid === false){
        alert("Invalid media input")
        return;
      }
    }

    const Story = {
      slides,
      category,
      likes: 0,
      author: user._id,
    };

    try {
      const res = await axios.post(storyRoutes, Story);
      alert("Story added successfully");
      navigate("/");
      setAddStoryVisible(!addStoryVisible)
      setUser(res.data.payload);
    } catch (error) {
      alert(error);
      console.log(error)
    }
  };

  return (
    <div className="outer">
      <div className="createStory">
        <div className="closeButtonContainer">
          <div
            className="close-button"
            onClick={() => {
              setAddStoryVisible(!addStoryVisible);
              navigate("/");
            }}
          ></div>
        </div>
        <div className="info"></div>
        <div className="slideContainer">
          {slides.map((slide, i) => (
            <div className={i === currSlide ? "curr slide" : "slide"}>
              {i === slides.length - 1 && i !== 2 && (
                <div className="closeButtonContainer">
                  <div
                    className="close-button"
                    onClick={handleRemoveSlide}
                  ></div>
                </div>
              )}
              Slide {i + 1}
            </div>
          ))}
          <div
            className="slide"
            style={{ cursor: "pointer" }}
            onClick={handleAddSlides}
          >
            Add +
          </div>
        </div>
        <div className="dataEntry">
          Heading :
          <input
            value={slides[currSlide].heading}
            placeholder="Your heading"
            onChange={(e) => {
              setSlides(
                slides.map((slide, i) =>
                  i === currSlide
                    ? { ...slide, heading: e.target.value }
                    : slide
                )
              );
            }}
          />
        </div>
        <div className="dataEntry">
          Description :
          <textarea
            rows={7}
            placeholder="Story Description"
            value={slides[currSlide].description}
            onChange={(e) => {
              setSlides(
                slides.map((slide, i) =>
                  i === currSlide
                    ? { ...slide, description: e.target.value }
                    : slide
                )
              );
            }}
          />
        </div>
        <div className="dataEntry">
          Image :
          <input
            placeholder="add image URL"
            value={slides[currSlide].imgURL}
            onChange={(e) => {
              setSlides(
                slides.map((slide, i) =>
                  i === currSlide ? { ...slide, imgURL: e.target.value } : slide
                )
              );
            }}
          />
        </div>
        <div className="dataEntry">
          Category :
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option
              key="Select Category"
              value="Select Category"
              selected
              hidden
            >
              Select Category
            </option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <div className="group1">
            <div
              className="pill"
              id="prev"
              onClick={() => {
                handleSlideChange(-1);
              }}
            >
              Previous
            </div>
            <div
              className="pill"
              id="next"
              onClick={() => {
                handleSlideChange(1);
              }}
            >
              Next
            </div>
          </div>
          <div className="group2">
            <div className="pill" id="post" onClick={validate}>
              Post
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStory;
