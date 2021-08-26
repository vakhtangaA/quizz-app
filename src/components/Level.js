import React from "react";

function Level() {
  return (
    <div className="levelPage">
      <h1>Select Level</h1>
      <button className="btn btn-secondary levelBtn">Easy</button>
      <button className="btn btn-secondary levelBtn">Medium</button>
      <button className="btn btn-secondary levelBtn">Hard</button>
      <button
        type="button"
        className="btn btn-outline-primary nextBtn levelNextBtn"
      >
        Next
      </button>
    </div>
  );
}

export default Level;
