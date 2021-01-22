import {canvas, canvasElement} from './domHandler.js'

function clear(){
    canvas.clearRect(0,0,canvas.canvas.width,canvas.canvas.height)
}

function drawBar(bar:Bar){   
    
    //flush the portion of the canvas correlated to that bar 
    canvas.clearRect(bar.x, bar.y, bar.width, -canvasElement.height)

    canvas.fillStyle = bar.color
    canvas.fillRect(bar.x, bar.y, bar.width, bar.height)
    
}

function render( list: number[]){
    clear()
    console.log('starting render')
    //list.forEach( (value, index) => drawBar(createBarData(value, index)) )
}


export {render, drawBar}
