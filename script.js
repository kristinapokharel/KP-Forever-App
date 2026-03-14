// ------------------- FIREBASE SETUP -------------------
if(localStorage.getItem("access") !== "granted"){
window.location.href = "access.html";
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-storage.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC88R9IMjUX2Q_vgo6yMMKSf12ocZRbRUI",
  authDomain: "kp-forever.firebaseapp.com",
  projectId: "kp-forever",
  storageBucket: "kp-forever.firebasestorage.app",
  messagingSenderId: "798002034483",
  appId: "1:798002034483:web:708096f3c6e3f90fecf046"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

// ------------------- MEMORY UPLOAD -------------------
const photoInput = document.getElementById("photoInput");
const uploadBtn = document.getElementById("uploadBtn");
const gallery = document.getElementById("memoriesGallery");

uploadBtn.onclick = () => {
    const file = photoInput.files[0];
    if (!file) {
        alert("Please choose a photo first");
        return;
    }

    // Upload to Firebase Storage
    const storageReference = sRef(storage, 'memories/' + file.name);
    uploadBytes(storageReference, file).then(() => {
        getDownloadURL(storageReference).then((url) => {
            // Save URL to database
            push(ref(db, 'memories'), { url });
            photoInput.value = ""; // clear input
        });
    });
};

// ------------------- LOAD ALL MEMORIES -------------------
onChildAdded(ref(db, 'memories'), (snapshot) => {
    const data = snapshot.val();
    const img = document.createElement("img");
    img.src = data.url;
    gallery.appendChild(img);
});
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {

e.preventDefault();

deferredPrompt = e;

const installBtn = document.getElementById("installApp");

if(installBtn){
installBtn.style.display = "block";

installBtn.addEventListener("click", () => {

deferredPrompt.prompt();

deferredPrompt.userChoice.then(() => {
deferredPrompt = null;
});

});
}

});