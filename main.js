prediction1 = ""

Webcam.set({ 
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

console.log("ml5 version", ml5.version);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_img" src = "' + data_uri + '"/>';
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1OnRN_tjA/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();
        if (results[0].label == "Left") {
            document.getElementById("update_emoji").innerHTML = "&#128072;";
        }
        if (results[0].label == "Right") {
            document.getElementById("update_emoji").innerHTML = "&#128073;";
        }
        if (results[0].label == "Up") {
            document.getElementById("update_emoji").innerHTML = "&#128070;";
        }
        if (results[0].label == "Down") {
            document.getElementById("update_emoji").innerHTML = "&#128071;";
        }
    }
}