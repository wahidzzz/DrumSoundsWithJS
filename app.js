const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.79 // confidence threshold for predictions.
};
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  msGetUserMedia;

//Select Everything from HTMl

document.querySelector("video");
document.querySelector("audio");

let model;

handTrack.startVideo(video).then(status => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      stream => {
        video.srcObject = stream;

        //Run Detection
        setInterval(runDetection, 100);
      },
      err => console.log(err)
    );
  }
});

function runDetection() {
  model.detect(video).then(predictions => {
    if (predictions.length !== 0) {
      let hand1 = predictions[0].bbox;

      let x = hand1[0];
      let y = hand1[1];

      if (y < 300) {
        if (x < 50) {
          audio.src = "./drum-tracks/crash-beat.wav";
        } else if (x < 100) {
          audio.src = "./drum-tracks/hithat-beat.wav";
        } else if (x < 150) {
          audio.src = "./drum-tracks/kick-beat.wav";
        } else if (x < 200) {
          audio.src = "./drum-tracks/openhat-beat.wav";
        }
      }
      audio.play();
    }
  });
}

handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
});
