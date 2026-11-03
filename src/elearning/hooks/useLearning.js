import { useContext } from "react";
import LearningContext from "../context/learningContext";

function useLearning() {
  const contexte = useContext(LearningContext);
  if (contexte === null) {
    throw new Error("useLearning doit être utilisé à l'intérieur d'un LearningProvider.");
  }
  return contexte;
}

export default useLearning;