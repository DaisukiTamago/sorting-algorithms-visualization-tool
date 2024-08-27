import {
  selectElement,
  shuffleButton,
  sortButton,
  disableControls,
  enableControls,
} from "./domHandler";

import { Renderer } from "./renderer";

import { listSize, executeChangesQueue, runAlgorithm } from "./data";

import * as Algorithms from "./algorithms";
import { canvasElement } from "./domHandler";

import "../../src/index.css";

const renderer = new Renderer();

const shuffle = () => execute(Algorithms.shuffle);
const sort = () => execute(algorithms[parseInt(selectElement.value)].function);
const mapAlgorithm = (func: SortingFunction): Algorithm => ({
  name: func.name,
  function: func,
});

const algorithms: Algorithm[] = Algorithms.default.map(mapAlgorithm);
const renderBar = (bar: Bar) =>
  renderer.addRectangle(bar.x, bar.y, bar.width, bar.height, bar.color);

sortButton.onclick = sort;
shuffleButton.onclick = shuffle;

selectElement.replaceChildren(
  ...algorithms.map(
    (algo) => new Option(algo.name, algorithms.indexOf(algo).toString())
  )
);

const execute = async (fn: SortingFunction) => {
  disableControls();

  const changes = runAlgorithm(
    fn,
    new Array(listSize).fill(0).map((_, i) => i + 1)
  );

  await executeChangesQueue(changes, renderBar);
  enableControls();
};

async function initialize() {
  await renderer.initialize(canvasElement);

  execute(Algorithms.initialize);
}

(async () => {
  await initialize();
})();
