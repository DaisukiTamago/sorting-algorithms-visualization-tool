import {canvas, canvasElement} from './domHandler'

function clear(){
    canvas.clearRect(0,0,canvas.canvas.width,canvas.canvas.height)
}

function drawBar(bar:Bar){   
    
    //flush the portion of the canvas correlated to that bar 
    canvas.clearRect(bar.x, bar.y, bar.width+1, -canvasElement.height)

    canvas.strokeStyle = "#000"
    canvas.strokeRect(bar.x, bar.y, bar.width, bar.height)
    canvas.fillStyle = bar.color
    canvas.fillRect(bar.x, bar.y, bar.width, bar.height)
}

function render(){
    clear()
    console.log('starting render')
    //list.forEach( (value, index) => drawBar(createBarData(value, index)) )
}


export {render, drawBar}
