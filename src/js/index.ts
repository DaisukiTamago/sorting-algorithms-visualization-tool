import { sortButton, shuffleButton, logButton, controlsContainer } from './domHandler.js'
import { 
    list,
    proxyHandler, 
    listSize, 
    addChangeToQueue, 
    changeQueue, 
    clearChangesQueue,
    executeChangesQueue} from './data.js'
import { drawBar } from './draw.js'
import { insertionSort, quicksort, shuffle } from './algorithms.js'

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
    //initialize array
    clearChangesQueue()
    for(let i = 0; i < listSize; i++){
        list[i] = i + 1
    }
    await executeChangesQueue(drawBar)
}

sortButton.onclick = async () => {
    clearChangesQueue()
    insertionSort(list)
    await executeChangesQueue(drawBar)
}

shuffleButton.onclick = async () => {
    clearChangesQueue()
    shuffle(list)
    await executeChangesQueue(drawBar)
}

logButton.onclick = async () => {
    clearChangesQueue()
    list.sort(function (a, b){return a - b;})
    await executeChangesQueue(drawBar)
}

window.onkeydown = (key: KeyboardEvent) => {
    if(key.key == " "){
        controlsContainer.style.visibility = controlsContainer.style.visibility == "hidden" ? "visible" : "hidden"
    }
    if(key.key == "c"){
        console.log(changeQueue)
    }
    if(key.key == "l"){
        console.log(list)
    }
}

(async () => {
    await initialize()
})()