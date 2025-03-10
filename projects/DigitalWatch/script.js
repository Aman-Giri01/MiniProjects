let cont=document.querySelector(".container");
let clock=document.getElementById("clock");

const currentTime=()=>{
    const date=new Date();
    clock.innerText=date.toLocaleTimeString();
};

currentTime();

setInterval(currentTime,1000);
 