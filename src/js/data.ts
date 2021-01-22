import { canvas, canvasElement } from './domHandler.js'

const listSize = 2000
const listElementHeight = canvasElement.height / listSize
const listElementWidth = canvasElement.width / listSize
const delay = (ms:number) => new Promise(res => setTimeout(res, ms))
const originalList = new Array(listSize)

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
    let a = []
    for (let i = 0; i < changeQueue.length; i++) {

        a[i] = new Promise<void>(async (resolve, reject) => {
            //await delay(interval)
            setTimeout(() => {
                if (changeQueue[i].type === "get") {
                    callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#F00' })
                    setTimeout(() => {
                        callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#FFF' })
                        resolve()
                    }, interval)
                } else {
                    callback({ ...createBarData(changeQueue[i].value, changeQueue[i].index), color: '#FFF' })
                    resolve()
                }
            }, 0)
        })

        await a[i]
    }
}

function addChangeToQueue(change: Change) {
    changeQueue.push(change)
}

export { list, proxyHandler, listSize, changeQueue, clearChangesQueue, executeChangesQueue, addChangeToQueue }