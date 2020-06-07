let theshader; 
let eyelid; 
let upperLid; 
var sandbox; 

function preload(){
}

// ------------------------------- Sketch Setup ------------------------------
function setup() {
//   var canvas = document.createElement("canvas");
// var sandbox = new GlslCanvas(canvas);
  var canvas = document.getElementsByClassName("glslCanvas");
  console.log(windowWidth); 
  console.log(windowHeight);
  canvas[0].width = windowHeight;
  canvas[0].height = windowWidth;
  console.log(canvas[0])
  sandbox = new GlslCanvas(canvas[0]); 
  // console.log(sandbox);
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  sandbox.setUniform("u_position", windowWidth/2, windowHeight/2);
}

// Window resize. 
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}