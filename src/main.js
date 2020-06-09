let eyelid; 
var sandbox; 
var canvasSize = [600, 400];
let factor = canvasSize[0]/canvasSize[1];
// ------------------------------- Sketch Setup ------------------------------
function setup() {
  createCanvas(canvasSize[0], canvasSize[1]);
  var canvas = document.getElementById("glslCanvas");
  canvas.width = canvasSize[0];
  canvas.height = canvasSize[1]; 
  sandbox = new GlslCanvas(canvas); 
  eyelid = new Eyelid(); 
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  background(150);
  // Update eyelid based on what it's doing. 
  sandbox.setUniform("u_position", 300, 200);
  noLoop();
}