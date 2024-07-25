import { createContext, useReducer } from "react";
import questions from "../dados/questions_complete";

const STAGES = ["Start", "Category", "Playing", "End"];

const initialState = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score: 0,
  answerSelected: false,
  helpTip: false,
  helpDelete: false,
  help: null,
  helpSelected: false,
  optionHide: null,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      return {
        ...state,
        gameStage: STAGES[1],
      };

    case "CATEGORY_HTML":
      const questionsHTML = state.questions.filter(
        (question) => question.category === "HTML"
      );
      console.log(questionsHTML[0].questions);
      return {
        ...state,
        questions: questionsHTML[0].questions,
        gameStage: STAGES[2],
      };

    case "CATEGORY_CSS":
      const questionsCSS = state.questions.filter(
        (question) => question.category === "CSS"
      );
      return {
        ...state,
        questions: questionsCSS[0].questions,
        gameStage: STAGES[2],
      };

    case "CATEGORY_JS":
      const questionsJS = state.questions.filter(
        (question) => question.category === "JavaScript"
      );
      return {
        ...state,
        questions: questionsJS[0].questions,
        gameStage: STAGES[2],
      };

    case "REODER_QUESTIONS":
      const reoderedQuestions = questions.sort(() => {
        return Math.random() - 0.5;
      });

      return {
        ...state,
        questions: reoderedQuestions,
      };

    case "CHANGE_QUESTION":
      const nextQuestion = state.currentQuestion + 1;
      let endGame = false;

      if (!state.questions[nextQuestion]) {
        endGame = true;
      }

      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[3] : state.gameStage,
        answerSelected: false,
        helpSelected: false,
        help: null,
      };

    case "NEW_GAME":
      return initialState;

    case "CHECK_ANSWER":
      if (state.answerSelected) {
        return state;
      }

      const answer = action.payload.answer;
      const option = action.payload.option;
      let correctAnswer = 0;

      if (answer === option) {
        correctAnswer = 1;
      }

      return {
        ...state,
        score: state.score + correctAnswer,
        answerSelected: option,
      };

    case "TIP":
      return {
        ...state,
        helpSelected: true,
        help: "tip",
        helpTip: true,
      };

    case "DELETE_OPTION":
      const question = state.questions[state.currentQuestion];

      let repaet = true;
      let optionHide;

      question.options.forEach((opt) => {
        if (opt !== question.answer && repaet) {
          optionHide = opt;
          repaet = false;
        }
      });

      return {
        ...state,
        helpSelected: true,
        optionHide,
        helpDelete: true,
      };

    default:
      return state;
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
