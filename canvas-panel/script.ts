const canvas = <HTMLCanvasElement> document.querySelector('#canvas')
const context = canvas.getContext('2d')

autoSetCanvasSize(canvas)

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    const pageWidth = document.documentElement.clientWidth
    const pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

let enableeraser = false
let enablePen = false
let penSize = 5
let eraserSize = penSize * 15
let color = 'black'
let lastPoint = {
  x: undefined,
  y: undefined
}

const docCSS = getComputedStyle(document.documentElement)
const hdHeight = parseInt(docCSS.getPropertyValue('--hd-height'), 10)
const minusHeaderHeight = (y:number) => y - hdHeight

function drawLine(x1:number, y1:number, x2:number, y2:number) {
  context.beginPath()
  context.strokeStyle = color
  context.moveTo(x1, minusHeaderHeight(y1))
  context.lineWidth = penSize
  context.lineTo(x2, minusHeaderHeight(y2))
  context.stroke()
  context.closePath()
}

canvas.onmousedown = function(event) {
  const x = event.clientX
  const y = event.clientY

  enablePen = true

  if (enableeraser) {
    context.clearRect(x - (eraserSize/2), minusHeaderHeight(y - (eraserSize/2)), eraserSize, eraserSize)
  } else {
    lastPoint = {
      x, y
    }
  }
}

canvas.onmousemove = function(event) {
  if (!enablePen) {
    return
  }

  const x = event.clientX
  const y = event.clientY

  if (enableeraser) {
    context.clearRect(x - (eraserSize/2), minusHeaderHeight(y - (eraserSize/2)), eraserSize, eraserSize)
  } else {
    const newPoint = {
      x, y
    }
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
    lastPoint = newPoint
  }
}

canvas.onmouseup = function() {
  enablePen = false
}

const colorWrap = document.querySelector('.color-wrap')
const colors = colorWrap.querySelectorAll('span')
const pen = document.querySelector('.pen') as HTMLElement
const eraser = document.querySelector('.eraser') as HTMLElement

const toolsWrap = document.querySelector('.tools')
const tools = toolsWrap.querySelectorAll('svg')
pen.onclick = function() {
  const activeColor = toolsWrap.querySelector('.active')
  activeColor.classList.remove('active')
  pen.classList.add('active')
  enableeraser = false
}
eraser.onclick = function() {
  const activeColor = toolsWrap.querySelector('.active')
  activeColor.classList.remove('active')
  eraser.classList.add('active')
  enableeraser = true
}

Array.from(colors).forEach(element => {
  element.onclick = function(event) {
    const activeColor = colorWrap.querySelector('.active')
    activeColor.classList.remove('active')
    const elem = event.target as HTMLElement
    elem.classList.add('active')
    color = getComputedStyle(elem).getPropertyValue('background-color')
    pen.click()
  }
})

const brushs = toolsWrap.querySelectorAll('li')
Array.from(brushs).forEach((brush, idx) => {
  brush.onclick = (function(idx) {
    return function() {
      penSize = (idx + 1) * 5
    }
  })(idx)
})


