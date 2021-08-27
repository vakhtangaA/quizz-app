import { useState, useEffect } from "react";
// import { Switch, Route, Link } from "react-router-dom";

function Questions({ url = "https://opentdb.com/api.php?amount=10" }) {
  const [questions, setQuestions] = useState([]);
  const [checked, setChecked] = useState("");

  useEffect(() => {
    fetch(url).then((res) => {
      res.json().then((data) => {
        setQuestions(data.results);
      });
    });
  }, [url]);

  function decodeHtmlEntities(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  function insert_correct_answer_at_random_index(falseAnswers, correctAnswer) {
    const allAnswers = falseAnswers.concat(correctAnswer);
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    return shuffledAnswers;
  }

  return questions ? (
    questions.map((element) => {
      const { question, correct_answer, incorrect_answers } = element;
      const decodedQuestion = decodeHtmlEntities(question);
      const answers = insert_correct_answer_at_random_index(
        incorrect_answers,
        correct_answer
      );

      return (
        <div key={question}>
          <h3>{decodedQuestion}</h3>
          {answers.map((answer) => {
            return (
              <div key={answer}>
                <input type="radio" value={answer} name={answer}></input>
                <label htmlFor={answer}>{answer}</label>
              </div>
            );
          })}
        </div>
      );
    })
  ) : (
    <h2>Loading...</h2>
  );
}

export default Questions;
