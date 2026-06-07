const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let photo = null;
let frame = new Image();

let scale = 1;
let rotation = 0;
let opacity = 1;

let posX = 540;
let posY = 540;

let dragging = false;
let startX;
let startY;

frame.src = "frame1.png";

document.getElementById("upload").addEventListener("change", e=>{

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(ev){

photo = new Image();

photo.onload = draw;

photo.src = ev.target.result;

}

reader.readAsDataURL(file);

});

document.querySelectorAll(".frame-thumb").forEach(img=>{

img.addEventListener("click", ()=>{

document.querySelectorAll(".frame-thumb")
.forEach(i=>i.classList.remove("active"));

img.classList.add("active");

frame.src = img.src;

frame.onload = draw;

});

});

document.getElementById("zoom").addEventListener("input", e=>{

scale = e.target.value / 100;
draw();

});

document.getElementById("rotate").addEventListener("input", e=>{

rotation = e.target.value;
draw();

});

document.getElementById("opacity").addEventListener("input", e=>{

opacity = e.target.value / 100;
draw();

});

canvas.addEventListener("mousedown", e=>{

dragging = true;

startX = e.offsetX - posX;
startY = e.offsetY - posY;

});

canvas.addEventListener("mousemove", e=>{

if(!dragging) return;

posX = e.offsetX - startX;
posY = e.offsetY - startY;

draw();

});

canvas.addEventListener("mouseup", ()=>{

dragging = false;

});

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

if(photo){

ctx.save();

ctx.translate(posX,posY);

ctx.rotate(rotation*Math.PI/180);

ctx.scale(scale,scale);

ctx.drawImage(
photo,
-photo.width/2,
-photo.height/2
);

ctx.restore();

}

ctx.save();

ctx.globalAlpha = opacity;

ctx.drawImage(frame,0,0,1080,1080);

ctx.restore();

}

document.getElementById("download")
.addEventListener("click", ()=>{

const link = document.createElement("a");

link.download = "framed-photo.png";

link.href = canvas.toDataURL("image/png");

link.click();

});
