import { useState } from "react";
function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState();
  const [dueDate, setDueDate] = useState();

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };
  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  // On clicking Add button , it should get added and inputs should get cleared also
  const handleAddButtonClick = () => {
    onNewItem(todoName, dueDate);
    setDueDate("");
    setTodoName("");
  };

  return (
    <div className="row kg-row">
      <div className="col-6">
        <input
          type="text"
          placeholder="Enter To-do here"
          onChange={handleNameChange}
          value={todoName}
        ></input>
      </div>
      <div className="col-4">
        <input type="date" onChange={handleDateChange} value={dueDate}></input>
      </div>
      <div className="col-2">
        <button
          type="button"
          className="btn btn-success kg-button"
          onClick={handleAddButtonClick}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
