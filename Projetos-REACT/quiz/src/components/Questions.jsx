import React from "react";

import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import "./Questions.css";
import Option from "./Option";

const Questions = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  const currentQuestion = quizState.questions[quizState.currentQuestion];

  const onSelectOption = (option) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: { answer: currentQuestion.answer, option },
    });
  };

  return (
    <div id="questions">
      <p>
        Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
      </p>
      <h2>Pergunta atual</h2>
      <h2>{currentQuestion.question}</h2>
      <div id="options-container">
        {currentQuestion &&
          currentQuestion.options.map((option) => (
            <Option
              option={option}
              key={option}
              answer={currentQuestion.answer}
              selectOption={() => onSelectOption(option)}
              hide={quizState.optionHide === option ? "hide" : null}
            />
          ))}
      </div>
      {quizState.answerSelected && (
        <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>
          Continuar
        </button>
      )}
      {!quizState.answerSelected && quizState.help === "tip" && (
        <p>{currentQuestion.tip}</p>
      )}
      {!quizState.helpSelected && !quizState.answerSelected && (
        <div className="buttons-container">
          {!quizState.helpTip && (
            <button onClick={() => dispatch({ type: "TIP" })}>Dica</button>
          )}
          {!quizState.helpDelete && (
            <button onClick={() => dispatch({ type: "DELETE_OPTION" })}>
              Excluir uma
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
