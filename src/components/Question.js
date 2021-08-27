import React, { useState, useEffect } from "react";
import { Paper, Button } from "@material-ui/core";

function Question({ questions }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState({});
  const [score, setScore] = useState(0);

  function decodeHtmlEntities(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  function insert_correct_answer_at_random_index(falseAnswers, correctAnswer) {
    const allAnswers = falseAnswers.concat(correctAnswer);
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    return shuffledAnswers;
  }

  useEffect(() => {
    if (questionIndex < 10) {
      if (questions.results) {
        const element = questions?.results[questionIndex];
        const { correct_answer, incorrect_answers } = element;
        const answers = insert_correct_answer_at_random_index(
          incorrect_answers,
          correct_answer
        );

        setAnswers(answers);
        setcurrentQuestion(element);
        setLoading(false);
      }
    }
  }, [questions, questionIndex]);

  useEffect(() => {
    const progressBar = document.getElementById("progress-bar");
    const paper = document.getElementById("paper");

    if (questionIndex > 9) {
      progressBar.style.display = "none";
      paper.innerHTML = "";

      const node = document.createElement("H2");
      const nodeBtn = document.createElement("BUTTON");
      const textNode = document.createTextNode(`You take ${score} out of 10`);
      const BtntextNode = document.createTextNode("Back to quiz");
      const a = document.createElement("a");

      nodeBtn.classList.add("btn");
      nodeBtn.classList.add("btn-primary");

      a.href = "/quizz-app";
      a.appendChild(nodeBtn);
      node.appendChild(textNode);
      nodeBtn.appendChild(BtntextNode);
      paper.appendChild(node);
      paper.appendChild(a);
    }
  }, [score, questionIndex]);

  const handleClick = (e) => {
    const progressBar = document.getElementById("progress");
    const progressSpan = document.getElementById("progress-bar-span");

    if (questionIndex < 10) {
      setQuestionIndex(questionIndex + 1);
      if (
        e.target.innerText.toLowerCase() ===
        currentQuestion.correct_answer.toLowerCase()
      ) {
        setScore(score + 1);
      }
      const currentWidthOfProgress = parseFloat(progressBar.style.width);

      if (questionIndex < 9) {
        progressBar.style.width = currentWidthOfProgress + 10 + "%";
      }

      progressSpan.innerText = `${questionIndex + 2}/10`;
    }
  };

  return !loading ? (
    <div className="question">
      <Paper className="questionPaper" id="paper">
        <h2>{decodeHtmlEntities(currentQuestion.question)}</h2>
        <div className="answers">
          {answers.map((answer, index) => {
            return (
              <div key={index}>
                <Button
                  variant="contained"
                  className="answerBtn"
                  color="secondary"
                  onClick={handleClick}
                >
                  {decodeHtmlEntities(answer)}
                </Button>
              </div>
            );
          })}
        </div>
      </Paper>

      <div id="progress-bar" className="progress" style={{ height: "24px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: "10%" }}
          id="progress"
        >
          <span className="sr-only" id="progress-bar-span">
            1/10
          </span>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Question;
