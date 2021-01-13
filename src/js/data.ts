import {canvas, canvasElement} from './domHandler.js'
import {paintBar} from './draw.js'

const listLength = 5
const originalList = new Array(listLength)
let changeQueue: Change[] = []
const listElementWidth = canvasElement.width / listLength
const listElementHeight = canvasElement.height / listLength
const proxyHandler: ProxyHandler<object> = {
    get: function (target, prop, receiver) {
        if(!isNaN(parseInt(prop as string))){
            observeArrayChanges({type: "get", elementIndex: prop as number}, changeQueue)
        }
        
        return target[prop]
    },
    
    set: function (target, prop, value, receiver) {
        observeArrayChanges({type: "set", elementIndex: prop as number}, changeQueue)
        target[prop] = value
        return true
    }
}
let list = (new Proxy(originalList, proxyHandler) as any[])

function observeArrayChanges(change: Change, changes: Change[]){
    changes.push(change)
}

function createBarData(value, index):Bar{
    return {
        value,
        x: index * listElementWidth,
        y: canvasElement.height - (value * listElementHeight),
        width: listElementWidth,
        height: (value * listElementHeight),
        color: "#FFF"
    }
}

function fillList(values: number[]) {
    values.map( (value, index) => list[index] = createBarData(value, index) )
}

for(let i = 0, orderedValues = []; i < listLength; i++){
    orderedValues.push(i + 1)

    if(i == listLength - 1){
        fillList(orderedValues)
        
    }
}

export {list, fillList, changeQueue}