let eyelid; 
var sandbox; 
var canvasSize = [600, 400];
let factor = canvasSize[0]/canvasSize[1];
// ------------------------------- Sketch Setup ------------------------------
function setup() {
  var canvas = document.getElementById("glslCanvas");
  canvas.width = windowWidth;
  canvas.height = windowHeight; 
  sandbox = new GlslCanvas(canvas); 
  eyelid = new Eyelid(); 
  noCanvas();
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  // Update eyelid based on what it's doing. 
  sandbox.setUniform("u_position", windowWidth/2, windowHeight/2);
  noLoop();
}