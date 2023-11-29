import React from "react";
import "./App.css";
import PatientTable from "./components/PatientTable.js";
import Todo from "./components/Todo.js"

function App() {
  return (
    <div>
      <PatientTable />
      <Todo />
    </div>
  );
}

export default App;