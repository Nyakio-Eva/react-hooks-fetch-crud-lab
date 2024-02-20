import React, { useState } from "react";

function QuestionItem({ 
   question, 
   onDeleteQuestion,
   onUpdateQuestion,
 }) {
  const { id, prompt, answers, correctIndex } = question;
  const [currentCorrectIndex, setCurrentCorrectIndex] = useState(correctIndex);

  const options = answers? answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  )): null;
  const handleDelete = () => {
    onDeleteQuestion(question.id);
  }
  const handleUpdateQuestion = (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    setCurrentCorrectIndex(newCorrectIndex);
    onUpdateQuestion(question.id, newCorrectIndex)
  }

  return (
    <ul>
    <li key={id}>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={currentCorrectIndex} onChange={handleUpdateQuestion}>
          {options}
        </select>
        
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
    </ul>
  );
}

export default QuestionItem;
