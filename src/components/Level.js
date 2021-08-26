import React, { useState } from "react";

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
      <button
        onClick={handleStart}
        type="button"
        className="btn btn-outline-primary nextBtn levelNextBtn"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Level;
