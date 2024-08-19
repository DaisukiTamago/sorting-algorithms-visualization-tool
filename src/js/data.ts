import { canvasElement, selectElement } from './domHandler.js'
import {beep} from './sound.js'

const listSize = 30
const originalList = new Array(listSize)

const listElementHeight = canvasElement.height / listSize
const listElementWidth = canvasElement.width / listSize

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const proxyHandler: ProxyHandler<object> = {}
const list = (new Proxy(originalList, proxyHandler) as number[])

let changeQueue: Change[] = []
console.log(selectElement.value)
function clearChangesQueue() {
    changeQueue = []
}

function createBarData(value: number, index: number): Bar {
    return {
        value,
        x: index * listElementWidth,
        y: canvasElement.height - listElementHeight * value,
        width: listElementWidth,
        height: (value * listElementHeight),
        color: "#FFF"
    }
}

async function executeChangesQueue(callback) {

    const interval = 0
    const promisesQueue = []
    let i = 0
    for (; i < changeQueue.length; i++) {

        promisesQueue[i] = new Promise<void>((resolve) => {
            if (changeQueue[i].type === "get") {
                callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#F00' })
                beep(changeQueue[i].value, listSize)
                delay(interval)
                callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#FFF' })
                resolve()
            } else {
                callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#0F0' })
                 delay(interval)
                callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#FFF' })
                resolve()
            }
        })

        await promisesQueue[i]
    }
}

function addChangeToQueue(change: Change) {
    changeQueue.push(change)
}

export { list, proxyHandler, listSize, changeQueue, clearChangesQueue, executeChangesQueue, addChangeToQueue }