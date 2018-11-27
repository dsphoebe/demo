let canvas = <HTMLCanvasElement> document.querySelector('#canvas')
const context = canvas.getContext('2d')

const pageWidth = document.documentElement.clientWidth
const pageHeight = document.documentElement.clientHeight

canvas.width = pageWidth
canvas.height = pageHeight

let using = false
let lastPoint = {
  x: undefined,
  y: undefined
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.strokeStyle = 'black'
  context.moveTo(x1, y1)
  context.lineWidth = 5
  context.moveTo(x2, y2)
  context.stroke()
  context.closePath()
}

canvas.onmousedown = function(event) {
  const x = event.clientX
  const y = event.clientY

  using = true

  lastPoint = {
    x, y
  }
}

canvas.onmousemove = function(event) {
  if (!using) {
    return
  }

  const x = event.clientX
  const y = event.clientY

  const newPoint = {
    x, y
  }

  drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)

  lastPoint = newPoint
}

canvas.onmousedown = function() {
  using = false
}