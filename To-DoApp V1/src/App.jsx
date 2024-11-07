import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import "./App.css";
import TodosItems from "./components/ToDoitems";

function App() {
  const initialtodoItems = [
    {
      name: "buy Milk",
      dueDate: "4/12/2024",
    },
    {
      name: "Go To Gym",
      dueDate: "4/12/2024",
    },
    {
      name: "Like and Follow please",
      dueDate: "23/12/2024",
    },
  ];

  const handleNewItem = (itemName, itemDuedate) => {
    console.log(`New Item added: ${itemDuedate}`);
    const newTodoItems = [
      ...todoItems,
      { name: itemName, dueDate: itemDuedate },
    ];
    setTodoItems(newTodoItems);
  };
  const [todoItems, setTodoItems] = useState(initialtodoItems);
  return (
    <center className="todo-container">
      <AppName></AppName>
      <AddTodo onNewItem={handleNewItem}></AddTodo>
      <TodosItems todoItems={todoItems}></TodosItems>
    </center>
  );
}

export default App;
