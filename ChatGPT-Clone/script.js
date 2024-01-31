




const inputmsg = document.querySelector("#chatInput");
const send = document.querySelector("#sendBtn");
const Question = document.querySelector(".Question");
const Responses=document.querySelector(".Response");

let quest = null;
const API_KEY="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";

function createBox(ele,classname) {
    const container = document.createElement('div');
    container.innerHTML = ele;
    const newDiv = container.firstChild;
    classname.appendChild(newDiv);
}


const GPTresponse=async ()=>{
    const API_URL="https://api.openai.com/v1/chat/completions";

    reqOptions={
        method:"POST",
        headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo-instruct",
            "messages": [
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": quest }
            ],
            "max_tokens": 2000,
            "temperature": 0.2,
            "n": 1,
            "stop": null
        })
    }

    try {
        const response= await(await fetch(API_URL,reqOptions)).json();
        console.log(response);
    } catch (error) {
        console.log("error");
    }

}

const lightModeBtn = document.querySelector("#lightMode");
const background = document.querySelector(".background");

let isLightMode = false;

function toggleLightMode() {
    isLightMode = !isLightMode;
    background.classList.toggle("light-mode", isLightMode);
}

lightModeBtn.addEventListener("click", toggleLightMode);


function sendingMsg() {
    quest = inputmsg.value.trim();
    const ele = `<div style="display: flex; justify-content:flex-start ;align-items:center"><img src="profile.png" ; id="profile"><div class="chat">${quest}</div></div>`;
    const res=`<div style="display: flex; justify-content: start; align-items: center"><div><img src="ChatGPT.png"  height="40px" style="padding:5px"></div><div id="ball"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`
    
    createBox(ele,Question);
    createBox(res,Responses);
    GPTresponse();
}

send.addEventListener("click", sendingMsg);
