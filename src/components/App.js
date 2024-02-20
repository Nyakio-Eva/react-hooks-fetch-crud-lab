import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetchQuestions();
  }, []);

  const fetchQuestions = async() =>{
    try{
      const response = await fetch('http://localhost:4000/questions')
      if (!response.ok){
        throw new Error('Error fetching questions')
      }
      const data = await response.json();
      console.log(data);
      setQuestions(data);

    }catch(error){
      console.error('Error fetching data:', error)
    }
  }

  const addQuestion = async (newQuestion) => {
    try{
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newQuestion),
      });

      if(!response.ok) {
        throw new Error("Error adding question")
      }
      fetchQuestions();
  
    }catch(error){
     console.error("Error adding question:", error);
    }
  };

  const deleteQuestion = async (questionId) =>{
    try{
      const response = await fetch(`http://localhost:4000/questions/${questionId}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      if(!response.ok){
        throw new Error("Error deleting question");
      }
      
     //if the question is successfully deleted from the server, update state to remove question from list
     setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId ));
    }catch(error){
     console.error("Error deleting question:", error);
    }
  }

  const updateQuestion = async (questionId, correctIndex) => {
    try{
     const response = await fetch (`http://localhost:4000/questions/${questionId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        correctIndex: correctIndex
      })

     })
     if(!response.ok){
      throw new Error('Error updating question')
     }
     //if the question is updated successfully on the server, handle response
     const updatedQuestion = await response.json();
     console.log("Updated question:", updatedQuestion);

    }catch(error){
      console.error('Error updating question:', error);
    }
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmit={addQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} onUpdateQuestion={updateQuestion}/>}
    </main>
  );
}

export default App;
