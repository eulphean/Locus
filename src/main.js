let eyelid; 
let upperLid; 
var sandbox; 
// ------------------------------- Sketch Setup ------------------------------
function setup() {
  var canvas = document.getElementById("glslCanvas");
  canvas.width = windowWidth;
  canvas.height = windowHeight; 
  sandbox = new GlslCanvas(canvas); 
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  sandbox.setUniform("u_position", windowWidth/2, windowHeight/2);
}