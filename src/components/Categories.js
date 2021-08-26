import { Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import DoneIcon from "@material-ui/icons/Done";
import { Switch, Route, Link } from "react-router-dom";

function Category({ name, random_color, handleClick, checked }) {
  return (
    <Paper
      elevation={9}
      style={{ background: random_color }}
      onClick={handleClick}
    >
      <h5 onClick={handleClick}>{name}</h5>
      {checked && (
        <div className="checkIcon">
          <DoneIcon />
        </div>
      )}
    </Paper>
  );
}

function Categories() {
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [checked, setChecked] = useState("");

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php").then((res) => {
      res.json().then((data) => {
        setCategories(data.trivia_categories);
      });
    });
    const colors = randomColor({
      count: 24,
      luminosity: "dark",
      format: "rgba",
      alpha: 0.5,
    });
    setColors(colors);
  }, []);

  useEffect(() => {
    const updatedCategories = categories.map((item) => ({
      ...item,
      checked: item.name !== checked ? false : true,
    }));
    setCategories([...updatedCategories]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleClick = (e) => {
    if (e.target.tagName === "DIV") {
      setChecked(e.target.firstChild.innerText);
    } else if (e.target.tagName === "H5") {
      setChecked(e.target.innerText);
    }
  };

  return (
    <div className="categoryPage">
      <h1 className="categoriesHeader">Choose Category</h1>
      <div className="categoryWrapper container">
        {categories &&
          categories.map((item, index) => {
            return (
              <Category
                name={item.name}
                key={item.id}
                categories={categories}
                random_color={colors[index]}
                handleClick={handleClick}
                checked={categories[index].checked}
              />
            );
          })}
      </div>
      <Link to="/level">
        <button type="button" className="btn btn-primary nextBtn">
          Next
        </button>
      </Link>
    </div>
  );
}

export default Categories;
