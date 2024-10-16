const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
//const socket = io();
const socket = io('/api/drawing');


// Set canvas dimensions
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let drawing = false;
let brushSize = 5;
let color = '#000000';

document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
});

document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    draw(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        draw(e);
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mouseout', () => {
    drawing = false;
    ctx.beginPath();
});

function draw(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Send drawing data to the server
    socket.emit('drawing', { x, y, brushSize, color });
}

// Listen for drawing data from other users
socket.on('drawing', (data) => {
    ctx.lineWidth = data.brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = data.color;

    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
});

document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
