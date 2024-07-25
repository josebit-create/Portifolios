import "./PickCategory.css";
import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import Category from "../Imagem/category.svg";

const PickCategory = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  return (
    <div id="pickcategory">
      <h2>Escolha uma categoria</h2>
      <p>As perguntas serão referente a uma das linguagens abaixo:</p>
      <div id="buttons-container">
        <button onClick={() => dispatch({ type: "CATEGORY_HTML" })}>
          HTML
        </button>
        <button onClick={() => dispatch({ type: "CATEGORY_CSS" })}>CSS</button>
        <button onClick={() => dispatch({ type: "CATEGORY_JS" })}>
          JavaScript
        </button>
      </div>
      <img src={Category} alt="Escolha sua categoria" />
    </div>
  );
};

export default PickCategory;
