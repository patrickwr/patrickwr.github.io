// console.log("CONNECTED!");

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");
var modeButtons = document.getElementsByClassName("mode");

var colors = [];
var numSquares = 6;
var pickedColor;

init();

function init() {
    setUpButtons();
    setUpSquares();
    reset();
}

function setUpButtons() {
    //set up mode buttons
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

function setUpSquares() {
    //add click listeners to squares
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            console.log("Clicked a square! " + clickedColor + " " + pickedColor);
            //compare color to picked color
            if (clickedColor === pickedColor) {
                console.log("Picked the correct color!");
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                h1.style.background = clickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                messageDisplay.textContent = "Try Again."
                this.style.backgroundColor = "#232323";
            }
        })
    }
}



function reset() {
        //Generate all new colors
        colors = generateRandomColors(numSquares);
        //pick a new random color from the array
        pickedColor = pickColor();
        colorDisplay.textContent = pickedColor;
        //change the colors of the squares
        for (var i = 0; i < squares.length; i++) {
            if (colors[i]) {
                squares[i].style.background = colors[i];
                squares[i].style.display = "block";
            }
            else {
                squares[i].style.display = "none";
            }
            squares[i].style.background = colors[i];
        }
        //Update background color of heading
        h1.style.background = "steelblue";
        resetButton.textContent = "New Colors";
        messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function () {
    reset();
});

function changeColors(color) {
    //loop through all squares
    for (var i = 0; i < squares.length; i++) {
        //change each color to match the given color
        squares[i].style.background = color;
    }
}

function pickColor() {
    var color = Math.floor(Math.random() * colors.length);
    return colors[color];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //add num random colors to the array
    for (var i = 0; i < num; i++) {
        //get random color and push into array
        arr.push(randomColor());
    }
    //return the array
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")"; 
}