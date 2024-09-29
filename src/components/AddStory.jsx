import React, { useEffect, useState } from "react";
import "../styles/addStory.css";

function AddStory({ setAddStoryVisible, addStoryVisible, user }) {
  const [category, setCategory] = useState("");

  const CATEGORIES = [
    "food",
    "health and fitness",
    "travel",
    "movies",
    "education",
  ];

  const [currSlide, setCurrSlide] = useState(1);

  const [slides, setSlides] = useState([
    { heading: "", description: "", imgURL: "" },
    { heading: "", description: "", imgURL: "" },
    { heading: "", description: "", imgURL: "" },
  ]);

  const handleAddSlides = () => {
    if (slides.length < 6) {
      setSlides([...slides, { heading: "", description: "", imgURL: "" }]);
    } else {
      prompt("Cannot exceed more than 6 slides");
    }
  };

  const handleRemoveSlide = () => {
    if (slides.length > 3) {
      const newSlides = slides.filter((_, i) => i !== currSlide - 1);
      setSlides(newSlides);
    } else {
      prompt("Cannot have less than 3 slides");
    }
  };

  return (
    <div className="outer">
      <div className="createStory">
        <div className="closeButtonContainer">
          <div
            className="close-button"
            onClick={() => {
              setAddStoryVisible(addStoryVisible);
            }}
          ></div>
        </div>
        <div className="info"></div>
        <div className="slideContainer">Slide 1 Slide 2</div>
        <div className="dataEntry">
          Heading :
          <input
            value={slides[currSlide].heading}
            placeholder="Your heading"
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="dataEntry">
          Description :
          <textarea
            rows={7}
            placeholder="Story Description"
            value={slides[currSlide].description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="dataEntry">
          Image :
          <input
            placeholder="add image URL"
            value={slides[currSlide].imgURL}
            onChange={(e) => setImgURL(e.target.value)}
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
            <div className="pill" id="prev">
              Previous
            </div>
            <div className="pill" id="next">
              Next
            </div>
          </div>
          <div className="group2">
            <div className="pill" id="post">
              Post
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStory;
