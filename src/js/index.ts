import {
  selectElement,
  shuffleButton,
  sortButton,
  disableControls,
  enableControls,
} from "./domHandler";
import {
  list,
  proxyHandler,
  listSize,
  addChangeToQueue,
  clearChangesQueue,
  executeChangesQueue,
} from "./data";
import { drawBar } from "./draw";
import * as Algorithms from "./algorithms";
import { shuffle } from "./algorithms";

console.log("Hello World!");
let chosenAlgorithm;

Algorithms.default.forEach((sortFunction, index) => {
  if (sortFunction) {
    const optionElement = document.createElement("option");
    optionElement.text = sortFunction.name;
    optionElement.value = index.toString();
    optionElement.className = "option";
    selectElement.appendChild(optionElement);
  }
});
selectElement.onchange = async () => {
  const functionIndex = selectElement.value;
  const functionElement = Algorithms.default[functionIndex];
  sortButton.disabled = false;
  sortButton.style.backgroundColor = "#000";

  chosenAlgorithm = async () => {
    clearChangesQueue();
    functionElement(list);
    disableControls();
    await executeChangesQueue(drawBar);
    enableControls();
  };
};

proxyHandler.get = function (target, prop) {
  if (!isNaN(parseInt(prop as string))) {
    addChangeToQueue({
      type: "get",
      index: prop as unknown as number,
      value: target[prop],
    });
  }

  return target[prop];
};

proxyHandler.set = function (target, prop, value) {
  target[prop] = value;
  addChangeToQueue({ type: "set", index: prop as unknown as number, value });
  return true;
};

async function initialize() {
  //button disabled until user select the first sorting method
  sortButton.disabled = true;
  sortButton.style.backgroundColor = "#f6f6f6";
  //initialize array
  clearChangesQueue();
  for (let i = 0; i < listSize; i++) {
    list[i] = i + 1;
  }
  await executeChangesQueue(drawBar);
}

sortButton.onclick = async () => {
  await chosenAlgorithm();
};

shuffleButton.onclick = async () => {
  clearChangesQueue();
  shuffle(list);
  disableControls();
  await executeChangesQueue(drawBar);
  enableControls();
};

(async () => {
  await initialize();
})();
