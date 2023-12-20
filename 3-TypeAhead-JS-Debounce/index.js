//Static Data
const FRUITS = [
  "Ackee",
  "Dragonfruit",
  "indian fig",
  "Pear",
  "Pineapple",
  "Apple",
  "Durian",
  "Ice apple",
  "Muskmelon",
  "Grapes",
  "Apricot",
  "Fig",
  "Guava",
  "Naranjilla",
  "Chestnuts",
  "Atemoya",
  "Egg fruit",
  "Jackfruit",
  "Mangosteen",
  "Rosehip",
  "Avocados",
  "Finger",
  "Jujube",
  "Nectarine",
  "Peanut",
  "Banana",
  "Feijoa/Pineapple",
  "guava/Guavasteen",
  "Jenipapo",
  "Passion fruit",
  "Watermelon",
  "Blueberry",
  "Fuyu",
  "Persimmon",
  "Mango",
  "Nance",
  "Tangerine",
  "Black sapote/Chocolate",
  "pudding fruit",
  "Buddha’s hand fruit",
  "Olive	Medlar fruit",
  "Melon",
  "Cantaloupe",
  "Hazelnut",
  "Lucuma	Quince",
  "Strawberries",
  "Cape gooseberry/Inca berry/Physalis	Honeyberries",
  "Rose apple/Water apple",
  "Oranges",
  "Snake fruit/Salak",
  "Chempedak",
  "Horned melon",
  "Mulberry",
  "Ramphal",
  "Rambutan",
  "Cherimoya",
  "Hog plum",
  "Langsat",
  "Papaya",
  "Raspberries",
  "Cherry",
  "Honeydew melon",
  "Longan",
  "Peach",
  "Sapota",
  "Coconut",
  "Kiwi",
  "Lychee",
  "Noni fruit",
  "Star Apple",
  "Custard apple/Sugar apple/Sweetsop",
  "Kabosu",
  "Kaffir lime/Makrut lime",
  "Mouse melon",
  "Starfruit/Carambola",
  "Dates",
  "Kiwano",
  "Lime",
  "Pomegranate",
  "Soursop",
];
//reference of form input
const inputText = document.getElementById("input");
const mainList = document.querySelector(".list");

//filter the data from all data -returns a promise
const getSuggestion = (inputData) => {
  //filter data based on input and store result in a variable
  const searchSuggestion = FRUITS.filter(
    (item) =>
      item.substring(0, inputData.length).toLowerCase() ===
      inputData.toLowerCase()
  );
  //return a promise so result can be handled async
  return new Promise((resolve) => {
    //resolveing after 1 sec to mimic api calling
    setTimeout(() => resolve(searchSuggestion), 1000);
  });
};

//sets value to form field and shows in UI
const setFieldValue = (value) => {
  input.value = value;
  clearField();
};

const clearField = () => {
  //clear all the items
  let items = document.querySelectorAll(".list-item");
  items.forEach((item) => {
    item.remove();
  });
};

async function handleSearch(data) {
  //guard clause
  if (!data) return;
  clearField();
  getSuggestion(data).then((res) => {
    for (let fruit of res) {
      //create a li tag
      let listItem = document.createElement("li");
      // add one common class name
      listItem.classList.add("list-item");
      listItem.addEventListener("click", () => setFieldValue(fruit));

      // Display matched part in bold --optional -------------------------------------------------
      // let word = "<b>" + fruit.substring(0, input.value.length) + "</b>";
      // word += fruit.substring(input.value.length);
      // listItem.innerHTML = word;
      // // -----------------------------------------------------------------------------------------

      // display the value in array
      listItem.innerHTML = fruit;
      //append <li></li> list to main list <ul></ul>
      mainList.appendChild(listItem);
    }
  });
}

//debounce logic
function debounceFn(fn, delay = 500) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), delay);
  };
}

const handleChange = (event) => {
  const value = event.target.value;
  if (value) {
    handleSearch(value);
  } else {
    clearField();
  }
};

inputText.addEventListener("input", debounceFn(handleChange, 1000));
