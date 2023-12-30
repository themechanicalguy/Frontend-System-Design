import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import Todo from "./Todo";

const TodoList = () => {
  const todos = useContext(TodoContext);
  console.log(todos);
  return (
    <ul>
      {todos.map((item) => (
        <li key={item.id}>
          <Todo task={item} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
