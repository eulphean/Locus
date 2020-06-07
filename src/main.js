let eyelid; 
var sandbox; 
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
  eyelid.update();
  sandbox.setUniform("u_position", windowWidth/2, windowHeight/2);
}