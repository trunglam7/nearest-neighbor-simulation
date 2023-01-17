const mainBoard = document.getElementById("board");
const inputHeader = document.getElementById("input-header");
let numberOfDots = 1000;
maxX = mainBoard.offsetWidth;
maxY = mainBoard.offsetHeight;
inputHeaderY = inputHeader.offsetHeight;

window.onload = () => {
    fillBoard(numberOfDots);
}

mainBoard.addEventListener('click', (e) =>{
    const mainDot = document.createElement("div");
    mainDot.classList.add("main-dot");
    mainDot.style.left = (e.x - 10) + "px";
    mainDot.style.top = (e.y - 10 - inputHeaderY) + "px";
    mainDot.style.backgroundColor = `hsla(${Math.floor(Math.random() * 361)}, 100%, 50%)`;
    mainBoard.appendChild(mainDot);
    nearestNeighbor();
})

function fillBoard(numberOfDots){
    console.log(numberOfDots);
    for(let i = 0; i < numberOfDots; i++){
        let randomX = Math.random() * (maxX + 1 - 10);
        let randomY = Math.random() * (maxY + 1 - 10);
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.top = randomY + "px";
        dot.style.left = randomX + "px";
        mainBoard.appendChild(dot);
    }
}

function updateNumberOfDots(){
    const numberDots = document.getElementById("number-input").value;
    numberOfDots = parseInt(numberDots);
    fillBoard(numberOfDots);
}

//Nearest Neighbor Algorithm
function nearestNeighbor(){
    const mainDots = document.getElementsByClassName("main-dot");
    const dots = document.getElementsByClassName("dot");

    for(let i = 0; i < dots.length; i++){
        let distance = Number.POSITIVE_INFINITY;
        let winner;
        for(let j = 0; j < mainDots.length; j++){
            console.log(dots[i].style.left);
            let dotX = parseInt(dots[i].style.left) - 5;
            let dotY = parseInt(dots[i].style.top) - 5;
            let mainDotX = parseInt(mainDots[j].style.left);
            let mainDotY = parseInt(mainDots[j].style.top);

            //Euclidean Distance
            let newDistance = Math.sqrt(Math.pow((dotX - mainDotX), 2) + Math.pow((dotY - mainDotY), 2));
            if(newDistance < distance) {
                distance = newDistance;
                winner = mainDots[j];
            }
        }

        dots[i].style.backgroundColor = winner.style.backgroundColor;
    }
}

