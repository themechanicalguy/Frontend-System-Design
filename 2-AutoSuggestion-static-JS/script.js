let names = [
  "Akash",
  "Asish",
  "Ashirbad",
  "Amelia",
  "Ava",
  "Alexander",
  "Austin",
  "Alice",
  "Bob",
  "Ben",
  "Brad",
  "Bala",
  "Bali",
  "Baldev",
  "Bella",
  "Babul",
  "chandan",
  "Camron",
  "Casey",
  "Charles",
  "Charlie",
  "Daren",
  "Daksh",
  "Daiwik",
  "Daman",
  "David",
  "Daniel",
  "Etun",
  "Eden",
  "Ethan",
  "Eva",
];

// sort names in ascending order
let sortedNames = names.sort();

// reference
let input = document.getElementById("input");

const removeElements = () => {
  //clear all the items
  let items = document.querySelectorAll(".list-item");
  items.forEach((item) => {
    item.remove();
  });
};

const displayName = (value) => {
  input.value = value;
  removeElements();
};

const onKeyUp = () => {
  // loop through above array
  removeElements();
  for (let name of names) {
    if (
      name.toLowerCase().startsWith(input.value.toLowerCase()) &&
      input.value !== ""
    ) {
      //create a li tag
      let listItem = document.createElement("li");
      // add one common class name
      listItem.classList.add("list-item");
      listItem.style.cursor = "pointer";
      // listItem.setAttribute("onclick", displayName(name));
      // listItem.setAttribute("onclick", "displayName('" + name + "')");
      listItem.addEventListener("click", () => displayName(name));

      // Display matched part in bold
      let word = "<b>" + name.substring(0, input.value.length) + "</b>";
      word += name.substring(input.value.length);
      // display the value in array
      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
  }
};

input.addEventListener("keyup", onKeyUp);
