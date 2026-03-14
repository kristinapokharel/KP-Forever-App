function calculateDays(){

const startDate = document.getElementById("startDate").value;

if(!startDate){
document.getElementById("result").textContent = "Please select a date ❤️";
return;
}

const start = new Date(startDate);
const today = new Date();

const difference = today - start;

const days = Math.floor(difference / (1000 * 60 * 60 * 24));

document.getElementById("result").textContent =
"You and your love have been together for " + days + " days ❤️";

}