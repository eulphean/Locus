let eyelid; 
var sandbox; 
var canvasSize = [600, 600];
let factor = canvasSize[0]/canvasSize[1];

// ------------------------------- Sketch Setup ------------------------------
function setup() {
  var canvas = document.getElementById("glslCanvas");
  canvas.width = canvasSize[0]; 
  canvas.height = canvasSize[1]; 
  sandbox = new GlslCanvas(canvas); 
  noCanvas();
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  // Update eyelid based on what it's doing. 
  sandbox.setUniform("u_position", canvasSize[0]/2, canvasSize[1]/2);
  noLoop();
}