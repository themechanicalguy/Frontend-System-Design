import { createContext, useReducer } from "react";

export const TodoContext = createContext(null);
export const SetTodoContext = createContext(null);

function tasksReducer(tasks, action) {
  console.log(action);
  switch (action.type) {
    case "add": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "change": {
      return tasks.map((t) => {
        console.log(t);
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "delete": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown Action: " + action.type);
    }
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  console.log(tasks);

  return (
    <TodoContext.Provider value={tasks}>
      <SetTodoContext.Provider value={dispatch}>
        {children}
      </SetTodoContext.Provider>
    </TodoContext.Provider>
  );
}
