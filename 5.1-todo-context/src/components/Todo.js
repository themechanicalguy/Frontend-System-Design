// import React from "react";

import { useContext, useState } from "react";
import { SetTodoContext } from "../context/TodoContext";

const Todo = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(SetTodoContext);

  let taskContext;
  if (isEditing) {
    taskContext = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "change",
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContext = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return <div>{taskContext}</div>;
};

export default Todo;
