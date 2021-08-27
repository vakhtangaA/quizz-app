import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Categories from "./components/Categories";
import Questions from "./components/Questions";
import Level from "./components/Level";
import Question from "./components/Question";

function App() {
  const [info, setInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php").then((res) => {
      res
        .json()
        .then((data) => {
          setCategories(data.trivia_categories);
        })
        .catch((err) => {
          console.error("Something went wrong with categories", err);
        });
    });
  }, []);

  const handleStart = () => {
    if (info.categoryId && info.level) {
      const url = `https://opentdb.com/api.php?amount=10&category=${info.categoryId}&difficulty=${info.level}`;
      fetch(url).then((res) => {
        res
          .json()
          .then((data) => {
            setQuestions(data);
            console.log("datad", data);
          })
          .catch((err) => {
            console.error("Something went wrong with questions", err);
          });
      });
    } else {
      const url = "https://opentdb.com/api.php?amount=10";
      fetch(url).then((res) => {
        res
          .json()
          .then((data) => {
            setQuestions(data);
          })
          .catch((err) => {
            console.error("Something went wrong with questions", err);
          });
      });
    }
  };

  const handleClick = (e) => {
    const node = e.target;

    if (categories) {
      function extract_id_from_category(name) {
        const category = categories.filter((item) => {
          return item.name === name;
        });
        const categoryId = category[0]?.id;

        return categoryId;
      }
      if (node.tagName === "DIV") {
        const categoryName = node.firstChild.innerText;
        setInfo({
          ...info,
          categoryName: categoryName,
          categoryId: extract_id_from_category(categoryName),
        });
      } else if (node.tagName === "H5") {
        const categoryName = node.innerText;
        setInfo({
          ...info,
          categoryName: categoryName,
          categoryId: extract_id_from_category(categoryName),
        });
      } else if (node.innerText === "Easy") {
        setInfo({ ...info, level: "easy" });
      } else if (node.innerText === "Medium") {
        setInfo({ ...info, level: "medium" });
      } else if (node.innerText === "Hard") {
        setInfo({ ...info, level: "hard" });
      }
    }
  };

  return (
    <Switch>
      <Route path="/questions" exact>
        <Questions url="https://opentdb.com/api.php?amount=10" />
      </Route>
      <Route path="/level" exact>
        <Level collectInfo={handleClick} handleStart={handleStart} />
      </Route>
      <Route path="/question" exact>
        <Question questions={questions} />
      </Route>
      <Route path="/">
        <Categories collectInfo={handleClick} checked={info.categoryName} />
      </Route>
    </Switch>
  );
}

export default App;
