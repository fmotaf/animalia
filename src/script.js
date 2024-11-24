import { validateAnswer, shuffleArray, generateRandomUppercaseLetters } from './utils.js';

const gamePhases = [
    { image: "assets/images/fox.png", answer: ["R", "A", "P", "O", "S", "A"] },
    { image: "assets/images/gorila2.png", answer: ["G", "O", "R", "I", "L", "A"] },
    { image: "assets/images/alligator.png", answer: ["J", "A", "C", "A", "R", "E"] },
    { image: "assets/images/bear.png", answer: ["U","R", "S", "O"] },
    { image: "assets/images/elephant.png", answer: ["E", "L", "E", "F", "A", "N", "T", "E"] },
    { image: "assets/images/lion.png", answer: ["L", "E", "A", "O"] },
    { image: "assets/images/owl.png", answer: ["C", "O", "R", "U", "J", "A"] }
];
let currentPhase = 0;

// Initialize points
let points = 0;

// Function to update points display
function updatePointsDisplay() {
    const pointsDisplay = document.getElementById('points-display');
    pointsDisplay.textContent = `Points: ${points}`;
}

// Function to handle correct answer
function handleCorrectAnswer() {
    points += 5; // Add 5 points for a correct answer
    updatePointsDisplay();
    alert("Correct! You've gained 5 points!");
}

// Function to handle wrong answer
function handleWrongAnswer() {
    points -= 1; // Deduct 1 point for a wrong answer
    if (points < 0) points = 0; // Prevent negative points
    updatePointsDisplay();
    alert("Wrong! You've lost 1 point!");
}

// Add event listeners for your game logic
document.getElementById('validateAnswer').addEventListener('click', () => {
    // Replace this with your validation logic
    const isAnswerCorrect = validateAnswer(); // Your custom function
    if (isAnswerCorrect) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
});


function saveGameState() {
    const gameState = {
        currentPhase,
        selectedButtons,
    };
    localStorage.setItem('animaliaGameState', JSON.stringify(gameState));
    console.log("Game state saved:", gameState);
}

function loadGameState() {
    const savedState = localStorage.getItem('animaliaGameState');
    if (savedState) {
        const { currentPhase: savedPhase, selectedButtons: savedButtons } = JSON.parse(savedState);
        currentPhase = savedPhase;
        selectedButtons = savedButtons || [];
        console.log("Game state loaded:", { currentPhase, selectedButtons });
    } else {
        console.log("No saved game state found. Starting fresh.");
    }
}

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
        saveGameState(); // Save the state after updating the phase
    } else {
        alert("Game Over!");
        localStorage.removeItem('animaliaGameState'); // Clear the state at the end of the game
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

function displayNickname() {
    const nicknameDisplay = document.getElementById('nickname-display');
    const savedNickname = localStorage.getItem('animaliaNickname');
    if (savedNickname) {
        nicknameDisplay.textContent = savedNickname+" está jogando!";
    }
}

function showGameScreen() {
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');
    loginScreen.classList.remove('login-screen');
    loginScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

function saveNickname() {
    const nicknameInput = document.getElementById('nickname-input');
    const nickname = nicknameInput.value.trim();

    if (nickname) {
        localStorage.setItem('animaliaNickname', nickname);
        console.log(`Nickname saved: ${nickname}`);
        showGameScreen();
    } else {
        alert("Please enter a nickname to proceed.");
    }
}

// Attach event listener to the login button
const startGameBtn = document.getElementById('start-game-btn');
startGameBtn.addEventListener('click', saveNickname);

// Check if a nickname already exists
document.addEventListener('DOMContentLoaded', function () {
    const savedNickname = localStorage.getItem('animaliaNickname');
    if (savedNickname) {
        console.log(`Welcome back, ${savedNickname}!`);
        showGameScreen();
    }
});

// Start the game
function startGame() {
    loadGameState(); // Load saved state
    displayNickname(); // Show the nickname on the game screen
    updateGamePhase();
}

startGame();
