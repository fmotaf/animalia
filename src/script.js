// import { validateAnswer } from './utils.js';

const gamePhases = [
    { image: "assets/images/fox.png", answer: "RAPOSA", hint: "É um animal esperto e ágil, conhecido por sua cauda longa e peluda." },
    { image: "assets/images/gorila.png", answer: "GORILA", hint: "É o maior primata do mundo e vive em florestas tropicais." },
    { image: "assets/images/alligator.png", answer: "JACARE", hint: "Reptil que vive em rios e pântanos, famoso por sua mordida poderosa." },
    { image: "assets/images/bear.png", answer: "URSO", hint: "Animal grande e peludo, gosta muito de mel." },
    { image: "assets/images/elephant.png", answer: "ELEFANTE", hint: "É o maior mamífero terrestre, conhecido por sua tromba." },
    { image: "assets/images/lion.png", answer: "LEAO", hint: "É o rei da selva, famoso por sua juba majestosa." },
    { image: "assets/images/owl.png", answer: "CORUJA", hint: "Ave noturna com olhos grandes, símbolo de sabedoria." },
    { image: "assets/images/horse.png", answer: "CAVALO", hint: "É um animal que foi usado por séculos para transporte e corridas. Vive em fazendas e pastos.", },
    { image: "assets/images/camelo.png", answer: "CAMELO", hint: "É conhecido por sobreviver no deserto e armazenar água em suas corcovas.", },
    { image: "assets/images/flamingo.png", answer: "FLAMINGO", hint: "Tem penas cor-de-rosa e costuma ficar em pé em uma perna só.", },
    { image: "assets/images/lobo.png", answer: "LOBO", hint: "É conhecido por uivar para a lua e viver em alcateias.", },
    { image: "assets/images/tigre.png", answer: "TIGRE", hint: "Um grande felino com listras pretas e laranjas. É um excelente caçador.", },
    { image: "assets/images/tubarao.png", answer: "TUBARAO", hint: "Um predador dos oceanos com dentes afiados e nadadeiras.", },
    { image: "assets/images/alce.png", answer: "ALCE", hint: "Um grande herbívoro com enormes galhadas, encontrado em florestas frias.", },
    { image: "assets/images/tucano.png", answer: "TUCANO", hint: "Uma ave tropical com um bico longo e colorido.", },
    { image: "assets/images/golfinho.png", answer: "GOLFINHO", hint: "É inteligente, vive no oceano e adora saltar sobre as ondas.", },
    { image: "assets/images/pato.png", answer: "PATO", hint: "Uma ave aquática que faz 'quá quá' e adora nadar em lagos.", },
    { image: "assets/images/pinguim.png", answer: "PINGUIM", hint: "Um pássaro que não voa, mas nada muito bem e vive no frio.", },
    { image: "assets/images/rinoceronte.png", answer: "RINOCERONTE", hint: "Tem um chifre no nariz e é um dos maiores herbívoros terrestres.", },
    { image: "assets/images/leopardo.png", answer: "LEOPARDO", hint: "Um felino com manchas que é muito rápido e vive em savanas.", },
    { image: "assets/images/eagle.png", answer: "AGUIA", hint: "Uma ave de rapina que é símbolo de força e voa muito alto." },
];

// Save the selected game phases to localStorage
function saveSelectedPhases(phases) {
    localStorage.setItem("animaliaSelectedPhases", JSON.stringify(phases));
}

// Load the selected game phases from localStorage
function loadSelectedPhases() {
    const savedPhases = localStorage.getItem("animaliaSelectedPhases");
    return savedPhases ? JSON.parse(savedPhases) : null;
}

// Save the current phase to localStorage
function saveCurrentPhase() {
    localStorage.setItem("animaliaCurrentPhase", currentPhase);
}

// Load the current phase from localStorage
function loadCurrentPhase() {
    const savedPhase = localStorage.getItem("animaliaCurrentPhase");
    return savedPhase ? parseInt(savedPhase, 10) : 0;
}

function getRandomPhases(gamePhases, count = 10) {
    // Shuffle the array to randomize the order
    const shuffled = gamePhases.sort(() => 0.5 - Math.random());
    // Slice the first `count` elements
    return shuffled.slice(0, count);
}

// Usage example:
const selectedGamePhases = getRandomPhases(gamePhases, 10);
console.log(selectedGamePhases);


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
}

// Handle wrong answer
function handleWrongAnswer() {
    points = parseInt(points, 10); // Ensure points is a number
    points -= 1; // Deduct points for a wrong answer
    if (points < 0) points = 0;
    localStorage.setItem("animaliaPoints", points); // Save updated points to localStorage
    updatePointsDisplay();
    alert("Errado! Você perdeu 1 ponto!");
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
}

// Update the game phase
// function updateGamePhase() {
//     const animalImage = document.getElementById("animal-image");
//     const answerInput = document.getElementById("answer-input");
//     const hintDisplay = document.getElementById("hint-display");
//     const currentImage = gamePhases[currentPhase].image;
//
//     if (!animalImage) {
//         console.error("Animal image element not found.");
//         return;
//     }
//
//     console.log("Loading image:", currentImage);
//     console.log("current phase value = ", currentPhase);
//     console.log("current game Phase = ", gamePhases[currentPhase]);
//     // Reset image source and apply blur
//     animalImage.src = currentImage;
//     animalImage.style.filter = "blur(45px)"; // Add blur effect at the start
//     // answerInput.value = ""; // Clear the input field
//     // answerInput.focus(); // Automatically focus the input field
//
//     // Limpar o campo de entrada e o campo de dica
//     if (answerInput) {
//         answerInput.value = "";
//         answerInput.focus();
//     }
//     if (hintDisplay) {
//         hintDisplay.textContent = ""; // Limpar a dica
//     }
// }
function updateGamePhase() {
    const animalImage = document.getElementById("animal-image");
    const answerInput = document.getElementById("answer-input");
    const hintDisplay = document.getElementById("hint-display");
    const currentImage = selectedGamePhases[currentPhase].image;

    if (!animalImage) {
        console.error("Animal image element not found.");
        return;
    }

    console.log("Loading image:", currentImage);
    console.log("current phase value = ", currentPhase);
    console.log("current game Phase = ", selectedGamePhases[currentPhase]);

    // Reset image source and apply blur
    animalImage.src = currentImage;
    animalImage.style.filter = "blur(45px)"; // Add blur effect at the start

    // Clear the input and hint
    if (answerInput) {
        answerInput.value = "";
        answerInput.focus();
    }
    if (hintDisplay) {
        hintDisplay.textContent = ""; // Clear the hint
    }
}




// Proceed to the next phase
// function nextPhase() {
//     if (currentPhase < gamePhases.length - 1) {
//         currentPhase++;
//         updateGamePhase();
//         saveGameState();
//     } else {
//         alert("Fim do jogo!");
//         localStorage.removeItem('animaliaGameState'); // Clear game state
//     }
// }
function nextPhase() {
    if (currentPhase < selectedGamePhases.length - 1) {
        currentPhase++;
        updateGamePhase();
        saveGameState();
        saveCurrentPhase(); // Save the updated phase index
    } else {
        alert("Fim do jogo!");
        localStorage.removeItem("animaliaGameState"); // Clear game state
        localStorage.removeItem("animaliaSelectedPhases"); // Clear selected phases
        localStorage.removeItem("animaliaCurrentPhase"); // Clear current phase
    }
}



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

// function displayImage() {
//     const animalImage = document.getElementById("animal-image");
//     const currentImage = gamePhases[currentPhase].image;
//
//     if (!animalImage) {
//         console.error("Animal image element not found.");
//         return;
//     }
//     console.log("Loading image:", currentImage);
//     // Reset image source and apply blur
//     animalImage.src = currentImage;
//     animalImage.style.filter = "blur(45px)"; // Add blur effect at the start
// }

function displayImage() {
    const animalImage = document.getElementById("animal-image");

    // Ensure you use the correct phase from `selectedGamePhases`
    const currentImage = selectedGamePhases[currentPhase].image;
    console.log(currentImage);

    if (!animalImage) {
        console.error("Animal image element not found.");
        return;
    }

    console.log("Loading image:", currentImage);
    // Set the correct image source and apply blur
    animalImage.src = currentImage;
    animalImage.style.filter = "blur(45px)"; // Add blur effect at the start
}


// Mostrar a dica
function showHint() {
    const hintDisplay = document.getElementById("hint-display");
    const currentHint = gamePhases[currentPhase].hint;

    // Exibir a dica
    hintDisplay.textContent = `Dica: ${currentHint}`;
}

// Associar o evento ao botão
const hintButton = document.getElementById("hint-button");
hintButton.addEventListener("click", showHint);



// Start the game
// function startGame() {
//     setUpInitialGamePoints();
//     loadGameState();
//     displayNickname();
//     displayImage();
//     updatePointsDisplay();
// }

function startGame() {
    // Load previously selected phases or generate new ones
    // const currentPhase = localStorage.getItem('animaliaCurrenPhase');
    const savedPhases = loadSelectedPhases();
    if (savedPhases) {
        const selectedGamePhases = savedPhases;
    } else {
        const selectedGamePhases = getRandomPhases(gamePhases, 10);
    }
    saveSelectedPhases(selectedGamePhases);

    // Load the current phase
    currentPhase = loadCurrentPhase();
    console.log('ch = ', currentPhase);
    // Initialize the game
    setUpInitialGamePoints();
    loadGameState();
    displayNickname();
    displayImage();
    updatePointsDisplay();
}

// function startGame() {
//     // Sempre recomeça na fase 0
//     currentPhase = 0;
//
//     // Carrega as fases selecionadas previamente ou gera novas
//     const savedPhases = loadSelectedPhases();
//     if (savedPhases) {
//         const selectedGamePhases = savedPhases;
//     } else {
//         const selectedGamePhases = getRandomPhases(gamePhases, 10);
//         saveSelectedPhases(selectedGamePhases);
//     }
//
//     // Carrega a pontuação existente
//     points = parseInt(localStorage.getItem('animaliaPoints'), 10) || 0;
//
//     // Atualiza os elementos do jogo
//     displayNickname();
//     displayImage();
//     updatePointsDisplay();
// }

startGame();
