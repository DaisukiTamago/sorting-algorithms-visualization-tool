const canvasElement = document.getElementById("renderer");
const shuffleButton = document.getElementById("shuffle") as HTMLButtonElement;
const logButton = document.getElementById("log") as HTMLButtonElement;
const sortButton = document.getElementById("sort") as HTMLButtonElement;
const selectElement = document.getElementById("select") as HTMLSelectElement;
const controlsContainer = document.getElementById("controls") as HTMLDivElement;

function enableControls() {
  if (selectElement.value != "12345") {
    sortButton.disabled = false;
  }
  shuffleButton.disabled = false;
  selectElement.disabled = false;
}

function disableControls() {
  selectElement.disabled = true;
  sortButton.disabled = true;
  shuffleButton.disabled = true;
}

export {
  shuffleButton,
  sortButton,
  logButton,
  selectElement,
  canvasElement,
  controlsContainer,
  enableControls,
  disableControls,
};
