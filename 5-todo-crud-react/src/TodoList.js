import { useState } from "react";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [toggle, settoggle] = useState(true);

  function handleClick() {
    if (inputValue && toggle && !currentEditItem) {
      let temp = { id: new Date().getTime().toString(), name: inputValue };
      setTodoList([...todoList, temp]);
      setInputValue("");
    } else {
      setTodoList(
        todoList.map((elem) => {
          if (elem.id === currentEditItem) {
            return { ...elem, name: inputValue };
          } else {
            return elem;
          }
        })
      );
      setInputValue("");
      setCurrentEditItem(null);
      settoggle(true);
    }
  }
  const handleDelete = (item) => {
    const index = todoList.indexOf(item);
    const temp = [...todoList];
    temp.splice(index, 1);
    setTodoList([...temp]);
  };

  const handleEdit = (item) => {
    setCurrentEditItem(item.id);
    settoggle(false);
    setInputValue(item.name);
  };

  return (
    <>
      {/* input field to add item to todolist */}
      <div className="inputcontainer">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add Items..."
        />
        <button onClick={handleClick}>{!toggle ? "edit" : "Add"}</button>
      </div>
      {/* container to show list */}
      <div className="todolistcontainer">
        <ul className="list">
          {todoList?.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.name}</span>
                <button onClick={() => handleEdit(item)}>edit</button>
                <button onClick={() => handleDelete(item)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
