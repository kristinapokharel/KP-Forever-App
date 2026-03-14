const messages = [

"I love you more every day ❤️",
"You are my favorite person in the whole world 💕",
"Distance means nothing when someone means everything 🌍❤️",
"You are my safe place 🫶",
"My day becomes better when I talk to you ☀️",
"You are my forever person 💍",
"I can't wait to hug you again 🤗",
"Even far away, you are always in my heart ❤️"

];

function generateLove(){

const random = Math.floor(Math.random() * messages.length);

document.getElementById("loveText").textContent = messages[random];

}