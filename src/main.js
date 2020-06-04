let theshader; 

function preload(){
  theShader = loadShader('shader.vert', 'shader.frag'); 
}

// ------------------------------- Sketch Setup ------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  shader(theShader); 
  rect(0, 0, width,height);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', millis()/1000.0);
  theShader.setUniform('u_position', [width/2, height/2]); 
}

// Window resize. 
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
