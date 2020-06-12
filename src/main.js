let eyelid; 
var sandbox; 
var canvasSize = [600, 400];
let factor = canvasSize[0]/canvasSize[1];
// ------------------------------- Sketch Setup ------------------------------
function setup() {
  var canvas = document.getElementById("glslCanvas");
  canvas.width = screen.width;
  canvas.height = screen.height; 
  sandbox = new GlslCanvas(canvas); 
  eyelid = new Eyelid(); 
  noCanvas();

  console.log(windowWidth + ', ' + windowHeight);
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  // Update eyelid based on what it's doing. 
  sandbox.setUniform("u_position", windowWidth/2, windowHeight/2);
  noLoop();
}