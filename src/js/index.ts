import { selectElement, controlsContainer, shuffleButton, sortButton, disableControls, enableControls } from './domHandler.js'
import { 
    list,
    proxyHandler, 
    listSize, 
    addChangeToQueue, 
    changeQueue, 
    clearChangesQueue,
    executeChangesQueue} from './data.js'
import { drawBar } from './draw.js'
import * as Algorithms from './algorithms.js'
import {shuffle} from './algorithms.js'

let chosenAlgorithm: Function

Algorithms.default.forEach( (sortFunction, index) => {
    if(sortFunction){
        let optionElement = document.createElement('option')
        optionElement.text = sortFunction.name
        optionElement.value = index.toString()
        optionElement.className = "option"
        selectElement.appendChild(optionElement)
    }
}
)
selectElement.onchange = async (event) => {
    let functionIndex = selectElement.value
    let functionElement = Algorithms.default[functionIndex] as Function
    sortButton.disabled = false
    sortButton.style.backgroundColor = "#000"

    chosenAlgorithm = async () => {
        clearChangesQueue()
        functionElement(list)
        disableControls()
        await executeChangesQueue(drawBar)
        enableControls()
    }
}

proxyHandler.get = function (target, prop, receiver) {
    if(!isNaN(parseInt(prop as string))){
        addChangeToQueue({type: "get", index: prop as number, value: target[prop]})
    }
    
    return target[prop]
}

proxyHandler.set = function (target, prop, value, receiver) {
    target[prop] = value
    addChangeToQueue({type: "set", index: prop as number, value})
    return true
}

async function initialize(){
    //button disabled until user select the first sorting method
    sortButton.disabled = true
    sortButton.style.backgroundColor = "#f6f6f6"
    //initialize array
    clearChangesQueue()
    for(let i = 0; i < listSize; i++){
        list[i] = i + 1
    }
    await executeChangesQueue(drawBar)
}

sortButton.onclick = async () => {
    await chosenAlgorithm()
}

shuffleButton.onclick = async () => {
    clearChangesQueue()
    shuffle(list)
    disableControls()
    await executeChangesQueue(drawBar)
    enableControls()
}

(async () => {
    await initialize()
})()