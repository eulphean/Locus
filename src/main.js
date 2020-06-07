let theshader; 
let eyelid; 
let upperLid; 

function preload(){
  theShader = loadShader('shader.vert', 'shader.frag'); 
}

// ------------------------------- Sketch Setup ------------------------------
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('container');
  canvas.style('z-index', 0); 
  eyelid = new Eyelid(); 
  noStroke();
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  shader(theShader); 
  rect(0, 0, width,height);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', millis()/1000.0);
  theShader.setUniform('u_position', [width/2, height/2]); 
  eyelid.draw(); 
}

// Window resize. 
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}