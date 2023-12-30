import AddTask from "./components/AddTask.js";
import TodoList from "./components/TodoList.js";
import { TasksProvider } from "./context/TodoContext.js";

export default function App() {
  return (
    <>
      <TasksProvider>
        <h1>Todo using context</h1>
        <AddTask />
        <TodoList />
      </TasksProvider>
    </>
  );
}
