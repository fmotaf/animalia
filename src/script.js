import { validateAnswer, shuffleArray, generateRandomUppercaseLetters } from './utils.js';

const gamePhases = [
    { image: "assets/images/fox.png", answer: ["F", "O", "X"] },
    { image: "assets/images/gorila2.png", answer: ["G", "O", "R", "I", "L", "A"] },

];
let currentPhase = 0;

function updateGamePhase() {
    const animalImage = document.getElementById("animal-image");
    const answerArea = document.getElementById("answer-container");
    const currentImage = gamePhases[currentPhase].image;

    console.log("Loading image:", currentImage);

    // Reset image source and apply blur
    animalImage.src = currentImage;
    animalImage.classList.add('blurred'); // Add blur at the start of the phase
    animalImage.style = 'filter: blur(45px)';
    animalImage.onerror = () => console.error("Failed to load image:", currentImage);
    answerArea.textContent = ""; // Reset the guessed characters
}

function revealImage() {
    const animalImage = document.getElementById("animal-image");
    animalImage.classList.remove('blurred'); // Remove blur to reveal

}

function nextPhase() {
    if (currentPhase < gamePhases.length - 1) {
        currentPhase++;
        selectedButtons = [];
        updateGamePhase();
    } else {
        alert("Game Over!");
    }
}

const buttonContainer = document.getElementById('button-container');
const answerContainer = document.getElementById('answer-container');
let selectedButtons = [];

// Generate random letters and shuffle
const randomLetters = generateRandomUppercaseLetters(26);
const shuffledLetters = shuffleArray([...randomLetters]);

// Create buttons for shuffled letters
shuffledLetters.forEach(letter => {
    const button = document.createElement('button');
    button.className = 'button-rounded';
    button.textContent = letter;
    buttonContainer.appendChild(button);
});

// Handle button clicks
const buttons = document.querySelectorAll('.button-rounded');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        selectedButtons.push(button.textContent);
        answerContainer.innerHTML += button.textContent;
    });
});

// Clear the last selected letter
const clearLastLetter = document.getElementById('clearLastLetter');
clearLastLetter.addEventListener('click', function () {
    if (selectedButtons.length > 0) {
        selectedButtons.pop();
        answerContainer.innerHTML = answerContainer.innerHTML.slice(0, -1);
    }
});

// Clear all selected letters
const clearAllLetters = document.getElementById('clearAll');
clearAllLetters.addEventListener('click', function () {
    selectedButtons = [];
    answerContainer.textContent = "";
});

// Validate the answer
const validateAnswerBtn = document.getElementById("validateAnswer");
validateAnswerBtn.addEventListener('click', function () {
    const userAnswer = selectedButtons;
    const correctAnswer = gamePhases[currentPhase].answer;

    if (validateAnswer(userAnswer, correctAnswer)) {
        alert("Correct!");
        revealImage(); // Reveal the image
        setTimeout(nextPhase, 2000); // Transition to the next phase after a delay
    } else {
        alert("Try again!");
    }
});

// Start the game
function startGame() {
    updateGamePhase();
}

startGame();
