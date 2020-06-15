let eyelid; 
var sandbox; 
let curTime; 

let canvasSize;
let currentPosition;
let newPosition; 
let isInterpolating; 
// ------------------------------- Sketch Setup ------------------------------
function setup() {
  currentPosition = createVector(0, 0); 
  newPosition = createVector(0, 0);

  var canvas = document.getElementById("glslCanvas");
  canvasSize = [windowWidth, windowHeight];

  // Set the starting position. 
  currentPosition.set(canvasSize[0]/2, canvasSize[1]/2); 

  // Resize canvas. 
  canvas.width = canvasSize[0]; canvas.height = canvasSize[1]; 
  sandbox = new GlslCanvas(canvas); 
  noCanvas();

//  requestPointerLock();
  
  // Start tracking time. 
  // curTime = millis(); 

  isInterpolating = false; 
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
  // if (millis() - curTime > 10000 && isInterpolating === false) {
  //   newPosition.set(random(canvasSize[0]-50, canvasSize[1]-50));
  //   let d = newPosition.dist(currentPosition); 
  //   while (d < windowWidth/2) {
  //     newPosition.set(random(canvasSize[0], canvasSize[1]));
  //     d = newPosition.dist(currentPosition);
  //   }
  //   // Start interpolation
  //   isInterpolating = true;
  // }

  // if (isInterpolating) {
  //   currentPosition = currentPosition.lerp(newPosition, 0.001); 
  //   let d = p5.Vector.dist(currentPosition, newPosition); 
  //   if (d < 50.0) {
  //     isInterpolating = false; 
  //     curTime = millis(); // Reset time. 
  //   }
  // }

  sandbox.setUniform("u_position", currentPosition.x, currentPosition.y);
}

function windowResized() {
  var canvas = document.getElementById("glslCanvas");
  canvasSize = [windowWidth, windowHeight];

  // Set the starting position. 
  currentPosition.set(canvasSize[0]/2, canvasSize[1]/2); 

  // Resize canvas. 
  canvas.width = canvasSize[0]; canvas.height = canvasSize[1]; 
}