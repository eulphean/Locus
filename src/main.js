let eyelid; 
var sandbox; 
var canvasSize = [600, 600];
let factor = canvasSize[0]/canvasSize[1];

var initPosition; 
// ------------------------------- Sketch Setup ------------------------------
function setup() {
  var canvas = document.getElementById("glslCanvas");
  initPosition = [displayWidth, displayHeight]; 
  canvas.width = initPosition[0]; 
  canvas.height = initPosition[1]; 
  sandbox = new GlslCanvas(canvas); 
  noCanvas();
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  sandbox.setUniform("u_position", initPosition[0]/2, initPosition[1]/2);
  // console.log(initPosition[0] + ', ' + initPosition[1]);
  // Update eyelid based on what it's doing. 
  // console.log(sandbox);
  // noLoop();
  // noLoop();
}