import { canvas, canvasElement } from './domHandler.js'

const listSize = 100
const originalList = new Array(listSize)

const listElementHeight = canvasElement.height / listSize
const listElementWidth = canvasElement.width / listSize

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const proxyHandler: ProxyHandler<object> = {}
let list = (new Proxy(originalList, proxyHandler) as number[])

let changeQueue: Change[] = []

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

async function executeChangesQueue(callback: Function) {

    let interval = 0
    let promisesQueue = []
    let i = 0
    for (; i < changeQueue.length; i++) {

        promisesQueue[i] = new Promise<void>(async (resolve) => {
            if (changeQueue[i].type === "get") {
                callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#F00' })
                await delay(interval)
                callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#FFF' })
                resolve()
            } else {
                callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#FFF' })
                await delay(interval)
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