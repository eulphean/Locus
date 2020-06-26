let eyelid; 
var sandbox; 
let curTime; 

let canvasSize;
let currentPosition;
let newPosition; 
let isInterpolating; 

var canvas; 

var stream; var recordedChunks = []; var mediaRecorder; 
var options = { mimeType: 'video/webm; codecs=vp9' };
// ------------------------------- Sketch Setup ------------------------------
function setup() {
  currentPosition = createVector(0, 0); 
  newPosition = createVector(0, 0);

  canvas = document.getElementById("glslCanvas");
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
  startRecording();
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

function startRecording() { 
  stream = canvas.captureStream(30);
  // Start recording. 
  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e0) {
    console.log('Unable to create MediaRecorder with options Object: ', e0);
    try {
      options = {mimeType: 'video/webm; codecs=vp9'};
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e1) {
      console.log('Unable to create MediaRecorder with options Object: ', e1);
      try {
        options = 'video/webm; codecs=vp9'; // Chrome 47
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e2) {
        alert('MediaRecorder is not supported by this browser.\n\n' +
          'Try Firefox 29 or later, or Chrome 47 or later, ' +
          'with Enable experimental Web Platform features enabled from chrome://flags.');
        console.error('Exception while creating MediaRecorder:', e2);
        return;
      }
    }
  }
  
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  // mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(500); // Every blob is worth 1second of data.
  console.log('MediaRecorder started', mediaRecorder);
  // startButton.innerHTML = 'Stop Recording'

  setTimeout(stopRecording, 5*60*1000); // After number of seconds. 
} 

function download() {
  console.log('Download Recording');
  var blob = new Blob(recordedChunks, {
    type: "video/webm"
  });
  var url = URL.createObjectURL(blob);
  console.log(url);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = Date.now() + '.webm';
  a.click();
  window.URL.revokeObjectURL(url);
}

function handleDataAvailable(event) {
  console.log('data-available'); 
  if (event.data.size > 0) {
    recordedChunks.push(event.data); 
    // console.log(recordedChunks); 
  } else {
    console.log('nothing');
  }
}

function stopRecording() {
  // Stop recording, initiate download
  // Restart recording. 
  mediaRecorder.stop(); 
  console.log('MediaRecorder stopped');

  // Initiate the download.
  download(); 

  // Start recording again. 
  startRecording(); 
}
