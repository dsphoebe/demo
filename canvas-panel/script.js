var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var isSupportTouch = 'ontouchstart' in document.documentElement;
autoSetCanvasSize(canvas);
listenToUser();
function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    };
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}
function listenToUser() {
    var enableeraser = false;
    var enablePen = false;
    var penSize = 5;
    var eraserSize = penSize * 15;
    var color = 'black';
    var lastPoint = {
        x: undefined,
        y: undefined
    };
    var docCSS = getComputedStyle(document.documentElement);
    var hdHeight = parseInt(docCSS.getPropertyValue('--hd-height'), 10);
    var minusHeaderHeight = function (y) { return y - hdHeight; };
    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(x1, minusHeaderHeight(y1));
        context.lineWidth = penSize;
        context.lineTo(x2, minusHeaderHeight(y2));
        context.stroke();
        context.closePath();
    }
    canvas.ontouchstart = function (event) {
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        enablePen = true;
        if (enableeraser) {
            context.clearRect(x - (eraserSize / 2), minusHeaderHeight(y - (eraserSize / 2)), eraserSize, eraserSize);
        }
        else {
            lastPoint = {
                x: x, y: y
            };
        }
    };
    canvas.onmousedown = function (event) {
        var x = event.clientX;
        var y = event.clientY;
        enablePen = true;
        if (enableeraser) {
            context.clearRect(x - (eraserSize / 2), minusHeaderHeight(y - (eraserSize / 2)), eraserSize, eraserSize);
        }
        else {
            lastPoint = {
                x: x, y: y
            };
        }
    };
    canvas.onmousemove = function (event) {
        if (!enablePen) {
            return;
        }
        var x = event.clientX;
        var y = event.clientY;
        if (enableeraser) {
            context.clearRect(x - (eraserSize / 2), minusHeaderHeight(y - (eraserSize / 2)), eraserSize, eraserSize);
        }
        else {
            var newPoint = {
                x: x, y: y
            };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    };
    canvas.ontouchmove = function (event) {
        if (!enablePen) {
            return;
        }
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        if (enableeraser) {
            context.clearRect(x - (eraserSize / 2), minusHeaderHeight(y - (eraserSize / 2)), eraserSize, eraserSize);
        }
        else {
            var newPoint = {
                x: x, y: y
            };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    };
    canvas.onmouseup = function () {
        enablePen = false;
    };
    canvas.ontouchend = function () {
        enablePen = false;
    };
    var colorWrap = document.querySelector('.color-wrap');
    var colors = colorWrap.querySelectorAll('span');
    var pen = document.querySelector('.pen');
    var eraser = document.querySelector('.eraser');
    var toolsWrap = document.querySelector('.tools');
    var tools = toolsWrap.querySelectorAll('svg');
    pen.onclick = function () {
        var activeColor = toolsWrap.querySelector('.active');
        activeColor.classList.remove('active');
        pen.classList.add('active');
        enableeraser = false;
    };
    eraser.onclick = function () {
        var activeColor = toolsWrap.querySelector('.active');
        activeColor.classList.remove('active');
        eraser.classList.add('active');
        enableeraser = true;
    };
    Array.from(colors).forEach(function (element) {
        element.onclick = function (event) {
            var activeColor = colorWrap.querySelector('.active');
            activeColor.classList.remove('active');
            var elem = event.target;
            elem.classList.add('active');
            color = getComputedStyle(elem).getPropertyValue('background-color');
            pen.click();
        };
    });
    var brushs = toolsWrap.querySelectorAll('li');
    Array.from(brushs).forEach(function (brush, idx) {
        brush.onclick = (function (idx) {
            return function () {
                penSize = (idx + 1) * 5;
            };
        })(idx);
    });
}
