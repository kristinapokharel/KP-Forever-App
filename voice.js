let mediaRecorder;
let audioChunks = [];
let audioBlob = null;

const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const sendBtn = document.getElementById("sendVoice");
const audioPlayback = document.getElementById("audioPlayback");

recordBtn.onclick = async () => {
   recordBtn.onclick = async () => {

audioChunks = [];
audioBlob = null;

const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

mediaRecorder = new MediaRecorder(stream);

mediaRecorder.start();

mediaRecorder.ondataavailable = e => {
audioChunks.push(e.data);
};

}};

stopBtn.onclick = () => {

mediaRecorder.stop();

mediaRecorder.onstop = () => {

audioBlob = new Blob(audioChunks,{type:"audio/mp4"});

const url = URL.createObjectURL(audioBlob);

audioPlayback.src = url;

};

};

sendBtn.onclick = () => {

if(!audioBlob){
alert("Record and stop the voice first");
return;
}

const reader = new FileReader();

reader.onloadend = function(){

const base64Audio = reader.result;

db.ref("messages").push({
voice: base64Audio,
user: "Voice User"
});

alert("Voice message sent ❤️");

window.location.href = "chat.html";

};

reader.readAsDataURL(audioBlob);

};