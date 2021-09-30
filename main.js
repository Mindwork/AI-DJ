song = "";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
score_left=0;
function setup() {
    canvas = createCanvas(500, 500);
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotposes);
}
function gotposes(results) {
    if (results.length > 0) { console.log(results);
        score_left=results[0].pose.keypoints[9].score;
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log(leftwristx);
    console.log(leftwristy);
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log(rightwristx);
    console.log(rightwristy);
    }
}
function modelLoaded() {
    console.log("posenet is active");
}
function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}
function draw() {
    image(video, 0, 0, 500, 500);
    fill("pale violet");
    stroke("purple");
    if (rightwristy>0&&rightwristy<=100){
        document.getElementById("speed").innerHTML="speed = 0.5";
        song.rate(0.5);
    }
    if (rightwristy>100&&rightwristy<=200){
        document.getElementById("speed").innerHTML="speed = 1.0";
        song.rate(1.0);
    }
    if (rightwristy>200&&rightwristy<=300){
        document.getElementById("speed").innerHTML="speed = 1.5";
        song.rate(1.5);
    }
    if (rightwristy>300&&rightwristy<=400){
        document.getElementById("speed").innerHTML="speed = 2.0";
        song.rate(2.0);
    }
    if (rightwristy>400&&rightwristy<=500){
        document.getElementById("speed").innerHTML="speed = 2.5";
        song.rate(2.5);
    }
    circle(rightwristx,rightwristy,20);
    if (score_left>0.2)
    {
    circle(leftwristx,leftwristy,20);
    innumber_leftwristy=Number(leftwristy);
    removed_decimals=floor(innumber_leftwristy);
    volume=removed_decimals/500;
    document.getElementById("volume").innerHTML="volume= "+volume;
    song.setVolume(volume);
    }
}
function preload() {
    song = loadSound("Breathing.mp3");
    console.log("play");
}
