import "./App.css";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import { getSuggestion } from "./utils/utility";

function App() {
  //input field state
  const [inputValue, setInputValue] = useState("");
  //suggestion list data state
  const [suggestionList, setSuggestionList] = useState([]);
  // toggle suggestion list state
  const [showSuggestionList, setShowSuggestionList] = useState(false);

  //fetch data
  async function fetchData() {
    const data = await getSuggestion(inputValue);
    data && setSuggestionList(data);
    setShowSuggestionList(true);
  }
  //selection of list items
  const handleSelect = (item) => {
    setInputValue(item);
    setShowSuggestionList(false);
  };

  //debounce logic
  useEffect(() => {
    let timer;
    if (inputValue) {
      timer = setTimeout(() => fetchData(), 200);
    } else {
      setShowSuggestionList(false);
    }
    //cleaning timeout
    return () => {
      setShowSuggestionList(false);
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <div className="App">
      <div className="searchContainer">
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Search Here"
        />
        <div>
          <ul className="listcontainer">
            {showSuggestionList &&
              suggestionList?.map((item) => (
                <li
                  key={item}
                  className="listitem"
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
