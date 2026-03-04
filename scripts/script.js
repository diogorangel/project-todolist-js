
const title = document.getElementById("main-title");
const message = document.getElementById("welcome-message");
document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById("main-title");
    const message = document.getElementById("welcome-message");

    if (title) {
        console.log("Successfully found the title element.");

        title.addEventListener("click", function() {
            const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            
            title.style.color = randomColor;
            console.log("Click detected! New color: " + randomColor);
        });
    }

    function checkUser() {
        if (!message) return; 

        let userName = localStorage.getItem("userName");

        if (!userName) {
            userName = prompt("What is your name?");
            
            if (userName && userName.trim() !== "") {
                localStorage.setItem("userName", userName);
            } else {
                userName = "Student";
            }
        }

        message.innerText = `Welcome and Hello World, ${userName}! This is my first software for Applied Programming.`;
    }

    checkUser();
});