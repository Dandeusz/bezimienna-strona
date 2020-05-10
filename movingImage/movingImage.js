const movingImage = document.createElement('img');
movingImage.src = "https://www.labourstart.org/sars-cov-19.jpg";
movingImage.style.width = "400px";
// movingImage.style.height = "400px";
document.body.append(movingImage);
movingImage.style.transition = 'all 1s'
const rotateButton = document.getElementById("rotateButton");
const resumeButton = document.getElementById("resumeButton");
const stopButton = document.getElementById("stopButton");

// function randomize(){
//     let x = Math.floor(document.body.clientWidth * Math.random())
//     let y = Math.floor(document.body.clientHeight * Math.random())
//     movingImage.style.transform = 'translate(${x}px,${y}px)';
// }


let startMoving = window.setInterval(()=> {
    let x = Math.floor(document.body.clientWidth * Math.random())
    let y = Math.floor(document.body.clientHeight * Math.random())
    movingImage.style.transform = `translate(${x}px,${y}px)`;
},3000);

rotateButton.addEventListener("click",  function (){
    const rotation = Math.floor(Math.random() *360);
    movingImage.style.transform = `rotate(${rotation}deg)`;
});
resumeButton.addEventListener("click",  function (){
    window.setInterval(()=> {
        let x = Math.floor(document.body.clientWidth * Math.random())
        let y = Math.floor(document.body.clientHeight * Math.random())
        movingImage.style.transform = `translate(${x}px,${y}px)`;
    },3000);
});
stopButton.addEventListener("click",  function (){
    clearInterval(startMoving);
});