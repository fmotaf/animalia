// import { validateAnswer } from './utils.js';

const gamePhases = [
    { image: "assets/images/fox.png", answer: "RAPOSA" },
    { image: "assets/images/gorila2.png", answer: "GORILA" },
    { image: "assets/images/alligator.png", answer: "JACARE" },
    { image: "assets/images/bear.png", answer: "URSO" },
    { image: "assets/images/elephant.png", answer: "ELEFANTE" },
    { image: "assets/images/lion.png", answer: "LEAO" },
    { image: "assets/images/owl.png", answer: "CORUJA" }
];
let currentPhase = 0;
let points = localStorage.getItem('animaliaPoints') != null ? localStorage.getItem('animaliaPoints') : "0" ;

// Update points display
function updatePointsDisplay() {
    const pointsDisplay = document.getElementById('points-display');
    pointsDisplay.textContent = `Pontos: ${points}`;
}

// Function to validate the player's answer using typed input
function validateAnswer() {
    const playerAnswerInput = document.getElementById('answer-input');
    const playerAnswer = playerAnswerInput.value.trim().toUpperCase(); // Convert input to uppercase
    console.log("gamePhase[currentPhase].answer = ", gamePhases[currentPhase].answer)
    const correctAnswerStr = gamePhases[currentPhase].answer; // Join the correct answer array to form a string

    console.log(playerAnswer === correctAnswerStr);
    if (playerAnswer === correctAnswerStr) {
        revealImage(); // Reveal the image if the answer is correct
        return true;
    } else {
        return false;
    }
}

// // Reveal the image
function revealImage() {
    const animalImage = document.getElementById("animal-image");
    animalImage.style.filter = "none"; // Remove blur
}

// Validate the answer when the "Validate Answer" button is clicked
const validateAnswerBtn = document.getElementById("validateAnswer");
validateAnswerBtn.addEventListener("click", function () {
    const isAnswerCorrect = validateAnswer(); // Call the updated validation function

    if (isAnswerCorrect) {
        handleCorrectAnswer();
        // setTimeout(nextPhase, 2000); // Move to the next phase after 2 seconds
    } else {
        handleWrongAnswer();
    }
});

// Handle correct answer
function handleCorrectAnswer() {
    points = parseInt(points, 10); // Ensure points is a number
    points += 5; // Add points for a correct answer
    localStorage.setItem("animaliaPoints", points); // Save updated points to localStorage
    updatePointsDisplay();
    alert("Correto! Você ganhou 5 pontos!");
    revealImage();
    setTimeout(nextPhase, 2000); // Proceed to the next phase
    // points = localStorage.getItem('animaliaPoints');
    // points += 5; // Add points for a correct answer
    // updatePointsDisplay();
    // alert("Correto! Você ganhou 5 pontos!");
    // revealImage();
    // setTimeout(nextPhase, 2000); // Proceed to the next phase
}

// Handle wrong answer
function handleWrongAnswer() {
    points = parseInt(points, 10); // Ensure points is a number
    points -= 1; // Deduct points for a wrong answer
    if (points < 0) points = 0;
    localStorage.setItem("animaliaPoints", points); // Save updated points to localStorage
    updatePointsDisplay();
    alert("Errado! Você perdeu 1 ponto!");
    // points -= 1; // Deduct points for a wrong answer
    // if (points < 0) points = 0;
    // updatePointsDisplay();
    // alert("Errado! Você perdeu 1 ponto!");
}

// Load game state
function loadGameState() {
    const savedState = localStorage.getItem('animaliaGameState');
    if (savedState) {
        const { currentPhase: savedPhase } = JSON.parse(savedState);
        currentPhase = savedPhase;
    } else {
        console.log("No saved game state found. Starting fresh.");
    }
}

// Save game state
function saveGameState() {
    const gameState = { currentPhase }; // Save the current phase
    localStorage.setItem("animaliaGameState", JSON.stringify(gameState));
    localStorage.setItem("animaliaPoints", points); // Save points as a number

    // localStorage.setItem('animaliaGameState', JSON.stringify({ currentPhase }));
    // localStorage.setItem('animaliaPoints', JSON.stringify({ points }));
}

// Update the game phase
function updateGamePhase() {
    const animalImage = document.getElementById("animal-image");
    const answerInput = document.getElementById("answer-input");
    const currentImage = gamePhases[currentPhase].image;

    if (!animalImage) {
        console.error("Animal image element not found.");
        return;
    }

    console.log("Loading image:", currentImage);
    console.log("current phase value = ", currentPhase);
    console.log("current game Phase = ", gamePhases[currentPhase]);
    // Reset image source and apply blur
    animalImage.src = currentImage;
    animalImage.style.filter = "blur(45px)"; // Add blur effect at the start
    answerInput.value = ""; // Clear the input field
    answerInput.focus(); // Automatically focus the input field
}


// Proceed to the next phase
function nextPhase() {
    if (currentPhase < gamePhases.length - 1) {
        currentPhase++;
        updateGamePhase();
        saveGameState();
    } else {
        alert("Fim do jogo!");
        localStorage.removeItem('animaliaGameState'); // Clear game state
    }
}

// // Validate the user's answer
// document.getElementById("validateAnswer").addEventListener("click", function () {
//     const userAnswer = document.getElementById("answer-input").value.trim().toUpperCase();
//     const correctAnswer = gamePhases[currentPhase].answer;
//
//     console.log(userAnswer)
//     console.log(correctAnswer)
//
//     if (validateAnswer(userAnswer, correctAnswer)) {
//         handleCorrectAnswer();
//     } else {
//         handleWrongAnswer();
//     }
// });

// Display the nickname
function displayNickname() {
    const nicknameDisplay = document.getElementById('nickname-display');
    const savedNickname = localStorage.getItem('animaliaNickname');

    if (savedNickname) {
        nicknameDisplay.textContent = `${savedNickname} está jogando!`;
    }
}

// Show the game screen
function showGameScreen() {
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');
    loginScreen.classList.remove('login-screen');
    loginScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

// Save the nickname
function saveNickname() {
    const nicknameInput = document.getElementById('nickname-input');
    const nickname = nicknameInput.value.trim();

    if (nickname) {
        localStorage.setItem('animaliaNickname', nickname);
        showGameScreen();
    } else {
        alert("Por favor, insira um apelido para continuar.");
    }
}

function setUpInitialGamePoints() {
    const pointsInput = document.getElementById('points-display');
    localStorage.setItem('animaliaPoints', 0);
}

// Attach event listener to the login button
const startGameBtn = document.getElementById('start-game-btn');
startGameBtn.addEventListener('click', saveNickname);


// Check if a nickname already exists
document.addEventListener('DOMContentLoaded', function () {
    const savedNickname = localStorage.getItem('animaliaNickname');
    if (savedNickname) {
        showGameScreen();
    }
});

function displayImage() {
    const animalImage = document.getElementById("animal-image");
    const currentImage = gamePhases[0].image;

    if (!animalImage) {
        console.error("Animal image element not found.");
        return;
    }
    console.log("Loading image:", currentImage);
    // Reset image source and apply blur
    animalImage.src = currentImage;
    animalImage.style.filter = "blur(45px)"; // Add blur effect at the start
}

// Start the game
function startGame() {
    setUpInitialGamePoints();
    loadGameState();
    displayNickname();
    displayImage();
    updatePointsDisplay();
}

startGame();
