import { beep } from "./sound";

const listSize = 4;
const originalList = new Array(listSize);

// TODO: remove this abomination rejected by god
const canvasElement = document.getElementById("renderer") as HTMLCanvasElement;

const listElementHeight = canvasElement.clientHeight / listSize;
const listElementWidth = canvasElement.clientWidth / listSize;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const proxyHandler: ProxyHandler<object> = {};
const list = new Proxy(originalList, proxyHandler) as number[];

let changeQueue: Change[] = [];
function clearChangesQueue() {
  changeQueue = [];
}

function createBarData(value: number, index: number): Bar {
  return {
    value,
    x: index * listElementWidth,
    y: canvasElement.clientHeight - listElementHeight * value,
    width: listElementWidth,
    height: value * listElementHeight,
    color: "#FFF",
  };
}

async function executeChangesQueue(
  changeQueue: Change[],
  callback: (bar: Bar) => void
) {
  const interval = 0;
  const promisesQueue = [];
  let i = 0;

  for (; i < changeQueue.length; i++) {
    promisesQueue[i] = new Promise<void>((resolve) => {
      if (changeQueue[i].type === "get") {
        callback({
          ...createBarData(changeQueue[i].value, changeQueue[i].index),
          color: "#F00",
        });
        beep(changeQueue[i].value, listSize);
        delay(interval).then(() => {
          callback({
            ...createBarData(changeQueue[i].value, changeQueue[i].index),
            color: "#FFF",
          });
          resolve();
        });
      } else {
        callback({
          ...createBarData(changeQueue[i].value, changeQueue[i].index),
          color: "#0F0",
        });
        delay(interval).then(() => {
          callback({
            ...createBarData(changeQueue[i].value, changeQueue[i].index),
            color: "#FFF",
          });
          resolve();
        });
      }
    });

    await promisesQueue[i];
  }
}

function addChangeToQueue(change: Change) {
  changeQueue.push(change);
}

function runAlgorithm(fn: SortingFunction, list: number[]): Change[] {
  const changes = [];

  const proxyList = new Proxy(list, {
    get(target, prop) {
      if (typeof prop == "string" && isNaN(parseInt(prop))) return target[prop];

      changes.push({ type: "get", index: prop, value: target[prop] });
      return target[prop];
    },
    set(target, prop, value) {
      changes.push({ type: "set", index: prop, value });
      target[prop] = value;
      return true;
    },
  });

  fn(proxyList);

  return changes;
}

export {
  list,
  proxyHandler,
  listSize,
  changeQueue,
  clearChangesQueue,
  executeChangesQueue,
  addChangeToQueue,
  runAlgorithm,
};
