let theshader; 
let eyelid; 
let upperLid; 

function preload(){
}

// ------------------------------- Sketch Setup ------------------------------
function setup() {
  var canvas = document.getElementsByClassName("glslCanvas");
  var sandbox = new GlslCanvas(canvas[0]); 
  console.log(sandbox);
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  sandbox.setUniform("u_position", 0.5, 0.5);
}

// Window resize. 
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}