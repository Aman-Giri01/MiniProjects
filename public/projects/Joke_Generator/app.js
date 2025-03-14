// https://official-joke-api.appspot.com/random_joke

const joke=document.querySelector('.item');

document.querySelector('.btn').addEventListener('click',()=>{
    fetch('https://official-joke-api.appspot.com/random_joke')
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        joke.innerHTML=
        `
            <p id="setup">${data.setup}</p>
            <p id="punchline">- ${data.punchline}</p>

        `
    })
    .catch(error=>console.log("Unable to Fetch data.",error));

});

// document.querySelector('.btn').addEventListener('click', () => {
//     fetch('https://official-joke-api.appspot.com/random_joke')
//     .then((res) => res.json())
//     .then((data) => {
//         document.getElementById("type").textContent = `Type: ${data.type}`;
//         document.getElementById("setup").textContent = `Setup: ${data.setup}`;
//         document.getElementById("punchline").textContent = `Punchline: ${data.punchline}`;
//     })
//     .catch(error => console.log("Unable to fetch data.", error));
// });



