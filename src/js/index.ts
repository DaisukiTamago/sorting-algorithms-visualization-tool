import { sortButton, shuffleButton, logButton, canvas } from './domHandler.js'
import { list, fillList, changeQueue } from './data.js'
import { render } from './draw.js'
import { insertionSort, shuffle } from './algorithms.js'

render(canvas, list)

sortButton.onclick = () => {
    fillList(insertionSort(list.map(bar => bar.value)))
    render(canvas, list)
}

shuffleButton.onclick = () => {
    fillList(shuffle(list.map(bar => bar.value)))
    render(canvas, list)
}

logButton.onclick = () => {
    console.log(list)
    console.log(changeQueue)
}
