var canvas = document.getElementById("canvas");
canvas.width = 480
canvas.height = 480
numberOfCells = 8;

//the number of lines inside the canvas is: numberOfCells - 1
function drawAllLinesInsideBox(canvas, numberOfCells) {
    canvasContext = canvas.getContext("2d");

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    peaceBetwenCells = canvasWidth / numberOfCells;


    //creacion de los rectangulos de color rosado palido
    for (var i = 0; i < canvasWidth; i = i + peaceBetwenCells) {
        for (var j = 0; j < canvasHeight; j = j + peaceBetwenCells) {
            canvasContext.fillStyle = "rgba(130, 150, 210, 0.5)";
            canvasContext.fillRect(i, j, peaceBetwenCells, peaceBetwenCells);
        }
    }

    //creacion de las lineas dentro del canvas
    for (var i = 0; i < canvasWidth; i = i + peaceBetwenCells) {
        for (var j = 0; j < canvasHeight; j = j + peaceBetwenCells) {
            canvasContext.lineWidth = 4;
            canvasContext.strokeStyle = "#7c5bca";
            canvasContext.moveTo(i, 0);
            canvasContext.lineTo(i, canvasHeight);
            canvasContext.stroke();
            canvasContext.moveTo(0, j);
            canvasContext.lineTo(canvasHeight, j);
            canvasContext.stroke();
        }
    }
}


drawAllLinesInsideBox(canvas, numberOfCells);