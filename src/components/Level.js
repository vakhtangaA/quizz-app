import React from "react";
import { Link } from "react-router-dom";

function Level({ handleStart, collectInfo }) {
  return (
    <div className="levelPage">
      <h1>Select Level</h1>
      <button className="btn btn-secondary levelBtn" onClick={collectInfo}>
        Easy
      </button>
      <button className="btn btn-secondary levelBtn" onClick={collectInfo}>
        Medium
      </button>
      <button className="btn btn-secondary levelBtn" onClick={collectInfo}>
        Hard
      </button>
      <Link to="/question">
        <button
          onClick={handleStart}
          type="button"
          className="btn btn-outline-primary nextBtn levelNextBtn"
        >
          Start Quiz
        </button>
      </Link>
    </div>
  );
}

export default Level;
