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

const algorithms: Algorithm[] = Algorithms.default.map((sortFunction) => ({
  name: sortFunction.name,
  function: sortFunction,
}));

selectElement.replaceChildren(
  ...algorithms.map(
    (algo) => new Option(algo.name, algorithms.indexOf(algo).toString())
  )
);

const renderBar = (bar: Bar) =>
  renderer.addRectangle(bar.x, bar.y, bar.width, bar.height, bar.color);

const execute = async (fn: (list: unknown[]) => void) => {
  clearChangesQueue();
  disableControls();
  fn(list);
  await executeChangesQueue(renderBar);
  enableControls();
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

sortButton.onclick = () =>
  execute(algorithms[parseInt(selectElement.value)].function);

shuffleButton.onclick = async () => {
  execute(shuffle);
};

async function initialize() {
  await renderer.initialize(canvasElement);

  for (let i = 0; i < listSize; i++) {
    list[i] = i + 1;
  }

  await executeChangesQueue(renderBar);
}

(async () => {
  await initialize();
})();
