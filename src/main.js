let eyelid; 
var sandbox; 
var canvasSize = [500, 500];
let factor = canvasSize[0]/canvasSize[1];

var initPosition; 
// ------------------------------- Sketch Setup ------------------------------
function setup() {
  var canvas = document.getElementById("glslCanvas");
  //initPosition = [canvasSize[0], canvasSize[1]]; 
  initPosition = [windowWidth, windowHeight];
  canvas.width = initPosition[0]; 
  canvas.height = initPosition[1]; 
  sandbox = new GlslCanvas(canvas); 
  noCanvas();
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  sandbox.setUniform("u_position", initPosition[0]/2, initPosition[1]/2);
}