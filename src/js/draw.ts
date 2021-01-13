function clear(canvas: CanvasRenderingContext2D){
    canvas.clearRect(0,0,canvas.canvas.width,canvas.canvas.height)
}

function drawBar(canvas: CanvasRenderingContext2D, bar:Bar){
    canvas.strokeStyle = "#000"
    canvas.strokeRect(bar.x, bar.y, bar.width, bar.height)
    canvas.fillStyle = "#000"
    canvas.fillRect(bar.x, bar.y, bar.width, bar.height)
    canvas.fillStyle = bar.color
    canvas.fillRect(bar.x, bar.y, bar.width, bar.height)
}

function render(canvas: CanvasRenderingContext2D, list: Bar[]){
    clear(canvas)
    list.forEach( bar => drawBar(canvas, bar) )
}

function paintBar(args: any, canvas: CanvasRenderingContext2D){
    if( !isNaN(parseInt(args[1])) ){
        let bar = args[0][args[1]]
        setTimeout(() => {
            console.log(bar)
            drawBar(canvas, {...bar, color: "#F00"})
            setTimeout(() => drawBar(canvas, {...bar, color: "#FFF"}),1000 )
        }, 700 )
    }
}

export {render, paintBar}
