import React, { useContext, useState } from "react";
import { SetTodoContext } from "../context/TodoContext";

const AddTask = () => {
  const [text, setText] = useState("");
  const dispatch = useContext(SetTodoContext);
  return (
    <>
      <input
        placeholder="Add Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({
            type: "add",
            id: next++,
            text: text,
          });
          setText("");
        }}
      >
        Add
      </button>
    </>
  );
};

export default AddTask;

let next = 0;
