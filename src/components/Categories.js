import { Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import DoneIcon from "@material-ui/icons/Done";
import { Link } from "react-router-dom";

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

function Categories({ collectInfo, checked }) {
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php").then((res) => {
      res.json().then((data) => {
        const filteredArr = data.trivia_categories.filter((item) => {
          return (
            item.id !== 25 && item.id !== 30 && item.id !== 13 && item.id !== 26
          );
        });
        setCategories(filteredArr);
        setLoading(false);
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

  if (loading) {
    return "";
  } else {
    return (
      <div className="categoryPage">
        <h1 className="categoriesHeader">Choose Category</h1>
        <div className="categoryWrapper container">
          {categories.map((item, index) => {
            return (
              <Category
                name={item.name}
                key={item.id}
                categories={categories}
                random_color={colors[index]}
                handleClick={collectInfo}
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
}

export default Categories;
