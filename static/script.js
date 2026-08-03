const chatBox = document.getElementById("chat-box");
const input  =document.getElementById("user-input");
const button  =document.querySelector("button");
const clearButton = document.getElementById("clear-btn");
function getCurrentTime(){
    return new Date().toLocaleTimeString([], {
        hour:"2-digit",
        minute:"2-digit"
    });
}
button.addEventListener("click",function(){
    const message = input.value;

    if (message.trim() === ""){
        return;
    }
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerHTML = `${message} <div class="time">${getCurrentTime()}</div>`;

    chatBox.appendChild(userMessage);

    const loadingMessage = document.createElement("div");
    loadingMessage.className = "bot-message";
    loadingMessage.innerHTML = "🤖 Thinking...";
    chatBox.appendChild(loadingMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    fetch("/chat",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:message
        })
    })
.then(response => response.json())
.then(data => {
    loadingMessage.innerHTML = `${data.reply} <div class="time">${getCurrentTime()}</div>`;
})
.catch(error => {
    console.error(error);
});
    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;
});

input.addEventListener("keypress",function(event){
    if (event.key === "Enter"){
        button.click();
    }  
});

input.focus();

clearButton.addEventListener("click", function() {
    chatBox.innerHTML = ` <div class="bot-message">Hello! How can I help you today?</div>`;
});