const canvasElement = (document.getElementById("canvas") as HTMLCanvasElement)
const shuffleButton = (document.getElementById("shuffle") as HTMLButtonElement)
const logButton = (document.getElementById("log") as HTMLButtonElement)
const sortButton = (document.getElementById("sort") as HTMLButtonElement)
const selectElement = (document.getElementById("select") as HTMLSelectElement)

const canvas = canvasElement.getContext("2d")

//make canvas inner size to be the same as the html canvas element
canvasElement.width = canvasElement.scrollWidth
canvasElement.height = canvasElement.scrollHeight

export {canvas, shuffleButton, sortButton, logButton, selectElement, canvasElement}