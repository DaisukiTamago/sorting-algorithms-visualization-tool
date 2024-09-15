import { beep } from "./sound";

const listSize = 10;
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
  callback: (bar: Bar) => void,
) {
  const interval = 0;
  const promisesQueue = [];
  let i = 0;

  for (; i < changeQueue.length; i++) {
    promisesQueue[i] = new Promise<void>((resolve) => {
      const change = Object.freeze(changeQueue[i]);

      if (change.type === "get") {
        callback({
          ...createBarData(change.value, change.index),
          color: "#F00",
        });

        beep(change.value, listSize);

        delay(interval).then(() => {
          callback({
            ...createBarData(change.value, change.index),
            color: "#FFF",
          });
          resolve();
        });
      } else {
        callback({
          ...createBarData(change.value, change.index),
          color: "#0F0",
        });

        delay(interval).then(() => {
          callback({
            ...createBarData(change.value, change.index),
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
  const changes: Change[] = [];

  const proxyList = new Proxy(list, {
    get(target, prop) {
      if (typeof prop == "string" && isNaN(parseInt(prop))) return target[prop];

      if (typeof prop == "string") {
        changes.push({
          type: "get",
          index: parseInt(prop),
          value: target[prop],
          textRepresentation: `Read on index ${String(prop)}`,
        });
      }

      return target[prop];
    },

    set(target, prop, value) {
      if (typeof prop === "string") {
        changes.push({
          type: "set",
          index: parseInt(prop),
          value,
          textRepresentation: `Set ${value} on index ${String(prop)}`,
        });
      }

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
