import { FRUITS } from "./constants";
export const getSuggestion = (inputData) => {
  //filter data based on input and store result in a variable
  console.log("called suggestion");
  const searchSuggestion = FRUITS.filter(
    (item) =>
      item.substring(0, inputData.length).toLowerCase() ===
        inputData.toLowerCase() && inputData !== item
  );
  //return a promise so result can be handled async
  return new Promise((resolve) => {
    //resolveing after 1 sec to mimic api calling
    setTimeout(() => resolve(searchSuggestion), 1000);
  });
};
