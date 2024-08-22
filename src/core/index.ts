import {
  selectElement,
  shuffleButton,
  sortButton,
  disableControls,
  enableControls,
} from "./domHandler";

import { Renderer } from "./renderer";

import {
  list,
  proxyHandler,
  listSize,
  addChangeToQueue,
  clearChangesQueue,
  executeChangesQueue,
} from "./data";

import * as Algorithms from "./algorithms";
import { canvasElement } from "./domHandler";
import { shuffle } from "./algorithms";

import "../../src/index.css";

const renderer = new Renderer();
let chosenAlgorithm;

const renderBar = (bar: Bar) =>
  renderer.addRectangle(bar.x, bar.y, bar.width, bar.height, bar.color);

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

  chosenAlgorithm = async () => {
    clearChangesQueue();
    functionElement(list);
    disableControls();
    await executeChangesQueue(renderBar);
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
  await renderer.initialize(canvasElement);
  // initialize array
  clearChangesQueue();
  for (let i = 0; i < listSize; i++) {
    list[i] = i + 1;
  }

  await executeChangesQueue(renderBar);
}

sortButton.onclick = async () => {
  await chosenAlgorithm();
};

shuffleButton.onclick = async () => {
  clearChangesQueue();
  shuffle(list);
  disableControls();

  await executeChangesQueue(renderBar);

  enableControls();
};

(async () => {
  await initialize();
})();
