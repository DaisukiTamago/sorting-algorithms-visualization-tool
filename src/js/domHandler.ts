const canvasElement = document.getElementById("renderer");
const shuffleButton = document.getElementById("shuffle") as HTMLButtonElement;
const logButton = document.getElementById("log") as HTMLButtonElement;
const sortButton = document.getElementById("sort") as HTMLButtonElement;
const selectElement = document.getElementById("select") as HTMLSelectElement;
const controlsContainer = document.getElementById("controls") as HTMLDivElement;
const disabledColor = "#F6F6F6";
const enabledColor = "#000";

function enableControls() {
  if (selectElement.value != "12345") {
    sortButton.disabled = false;
    sortButton.style.backgroundColor = enabledColor;
  }
  shuffleButton.disabled = false;
  selectElement.disabled = false;
  shuffleButton.style.backgroundColor = enabledColor;
  selectElement.style.backgroundColor = enabledColor;
}

function disableControls() {
  sortButton.style.backgroundColor = disabledColor;
  shuffleButton.style.backgroundColor = disabledColor;
  selectElement.style.backgroundColor = disabledColor;
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
