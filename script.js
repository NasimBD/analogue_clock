
var Canvas = document.getElementById('canvas');
var Numbers = document.getElementById('numbers');
var Hands = document.getElementById('hands');
var DateCanvas = document.getElementById('date');

var ctxCanvas = Canvas.getContext('2d');
var ctxNumbers = Numbers.getContext('2d');
var ctxHands = Hands.getContext('2d');
var ctxDate = DateCanvas.getContext('2d');


const padding = 10;
let canvasWidth = Canvas.clientWidth;
let canvasHeight = Canvas.clientHeight;
let radius = Canvas.clientWidth / 2 - padding;
let thickness = 15;

// set the origin of these canvases at the center 
ctxHands.translate(canvasWidth / 2, canvasWidth / 2);
ctxDate.translate(canvasWidth / 2, canvasWidth / 2);

// for printing numbers
const numbersBaseDegree = (2 * Math.PI) / 12;
const numbersRadius = radius * 0.69;

// for printing ticks
const ticksBaseDegree = (2 * Math.PI) / 60;

// for date & time
const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const hourBaseAngle = 2 * Math.PI / 12;
const minuteBaseAngle = 2 * Math.PI / 60;
const hourHandThickness = 4;
const minuteHandThickness = 2;
const secondHandThickness = 1;
const hourHandLength = 0.3 * radius;
const minuteHandLength = 0.4 * radius;
const secondHandLength = 0.5 * radius;


drawFace();
drawTicks();
drawNumbers();
setInterval(drawTime, 1000);


function drawFace(){
    ctxCanvas.beginPath();
    ctxCanvas.beginPath(); 

    // The background of the clock
    ctxCanvas.arc(canvasWidth / 2, canvasWidth / 2, radius, 0, 2 *Math.PI);
    ctxCanvas.fillStyle= "#500C2D";
    ctxCanvas.fill();

    // The rim of the clock
    ctxCanvas.lineWidth = 0.2 * radius;
    var grd = ctxCanvas.createRadialGradient(canvasWidth / 2, canvasWidth / 2, radius * 0.9, canvasWidth / 2, canvasWidth / 2,  radius * 1.1);
    grd.addColorStop(0, "hsl(340, 51%, 52%)");
    grd.addColorStop(0.5, "hsl(351, 82%, 75%)");
    grd.addColorStop(1, "hsl(340, 51%, 52%)");
    ctxCanvas.arc(canvasWidth / 2, canvasWidth / 2, radius, 0, 2 * Math.PI);
    ctxCanvas.strokeStyle = grd;
    ctxCanvas.stroke(); 
    ctxCanvas.closePath();  
}

function drawTicks(){
    ctxCanvas.translate(canvasWidth / 2, canvasWidth / 2);
    ctxCanvas.lineWidth = "1";
           
    for (let i = 1; i <= 60; i++){
        ctxCanvas.beginPath();
        if(i % 5 === 0){
            ctxCanvas.strokeStyle = "rgba(250, 250, 250, 0.5)";
            ctxCanvas.moveTo(radius * 0.82 * Math.cos(i * ticksBaseDegree) , radius * 0.82 * Math.sin(i * ticksBaseDegree));
        }else{
            ctxCanvas.strokeStyle = "rgba(250, 250, 250, 0.3)";
            ctxCanvas.moveTo(radius * 0.85 * Math.cos(i * ticksBaseDegree) , radius * 0.85 * Math.sin(i * ticksBaseDegree));  
            }
        ctxCanvas.lineTo(radius * 0.9 * Math.cos(i * ticksBaseDegree) , radius * 0.9 * Math.sin(i * ticksBaseDegree));
        ctxCanvas.stroke();
        ctxCanvas.moveTo(0,0);
        ctxCanvas.closePath();
    }
    ctxCanvas.translate(-canvasWidth / 2, -canvasWidth / 2);
}

function drawNumbers(){
    ctxNumbers.beginPath();
    ctxNumbers.fillStyle = "rgba(250, 250, 250, 0.3)";
    ctxNumbers.translate(canvasWidth / 2, canvasWidth / 2);
    ctxNumbers.textAlign = "center";
    ctxNumbers.textBaseline = "middle";
    ctxNumbers.font = "1.5rem Georgia";

    for (i = 1; i < 13 ; i++){
        const rotationDegree = numbersBaseDegree * i;
        ctxNumbers.rotate(rotationDegree);
        ctxNumbers.translate(0, -numbersRadius);
        ctxNumbers.rotate(-rotationDegree);

        ctxNumbers.fillText(i , 0,0);

        ctxNumbers.rotate(rotationDegree);
        ctxNumbers.translate(0, numbersRadius);
        ctxNumbers.rotate(-rotationDegree);
    }
    ctxNumbers.closePath();
}


function drawTime(){
    const currentTime = new Date();
    const month = Months[currentTime.getMonth() + 1];
    const date = currentTime.getDate() > 10 ? currentTime.getDate() : '0' + currentTime.getDate();
    writeDate(month, date);

    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();
    hour = hour % 12;
    hour = hour + parseFloat((minute / 60).toFixed(2)) + parseFloat((second / 3600).toFixed(2));
    minute = minute + parseFloat((second / 60).toFixed(2));
    ctxHands.clearRect(-canvasWidth / 2, -canvasWidth / 2, canvasWidth, canvasWidth );
    drawHands(hour * hourBaseAngle, hourHandThickness , hourHandLength, '#000');
    drawHands(minute * minuteBaseAngle, minuteHandThickness , minuteHandLength, '#000');
    drawHands(second * minuteBaseAngle, secondHandThickness , secondHandLength, 'red');
}


function writeDate(monthP, dateP){
    ctxDate.beginPath();
    ctxDate.textBaseline = 'middle';
    ctxDate.fillStyle = "rgba(250, 250, 250, 0.5)";
    ctxDate.clearRect(-canvasWidth / 2, -canvasWidth / 2, canvasWidth, canvasWidth );
    ctxDate.font = "0.9rem Georgia";
    ctxDate.fillText(`${monthP} ${dateP}` , 0.1 * radius,0);
    ctxDate.closePath();
}


function drawHands(angle, width, length, color){
    ctxHands.beginPath();
    ctxHands.lineWidth = width;
    ctxHands.lineCap = "round";
    ctxHands.strokeStyle = color;
    ctxHands.rotate(angle);
    ctxHands.moveTo(0, 0);
    ctxHands.lineTo(0, -length);
    ctxHands.stroke();
    ctxHands.rotate(-angle);
    ctxHands.closePath();
}
