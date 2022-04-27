bottle_img = "";
model_status = "";
objects = [];

function preload(){
    bottle_img = loadImage("bottle.jpeg");
}

function setup(){
    canvas = createCanvas(400, 433);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting objects..."
}

function modelLoaded(){
    model_status = true;
    objectDetector.detect(bottle_img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.log(error);
    }
    console.log(result);
    objects = result;
    document.getElementById("number_of_objects").innerHTML = "There is 1 object in the image from which COCOSSD has detected " + result.length + " objects";
}

function draw(){
    image(bottle_img, 0, 0, 400, 533);
    if(model_status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status - Detected objects";
            fill("black");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}