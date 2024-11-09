import {validateAnswer, shuffleArray, generateRandomUppercaseLetters, revealImage} from './utils.js'; // Import functions from utils.js

const CORRECT_ANSWER = ['L', 'E', 'A', 'O'];

// Example usage: Generate 16 random uppercase letters
const randomLetters = generateRandomUppercaseLetters(26);
console.log("randomLetters = ", randomLetters);


const shuffledLetters = shuffleArray([...randomLetters]);
const buttonContainer = document.getElementById('button-container');

shuffledLetters.forEach(letter => {
    const button = document.createElement('button');
    button.className = 'button-rounded';
    button.textContent = letter;
    buttonContainer.appendChild(button);
});

let selectedButtons = []
const buttons = document.querySelectorAll('.button-rounded')

const answerContainer = document.getElementById('answer-container');
console.log("selectedButtons = ", selectedButtons)


// TO CRIANDO DUAS VARIAVEIS selectedButtons E answerContainer, tem que ser uma só!!!
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // this.classList.toggle('red');
        console.log(this.classList)
        console.log(typeof(this.classList))
        // if (this.classList.contains('red')){
        selectedButtons.push(button.textContent);
        const selectedButton = document.createElement('p');
        selectedButton.id = "lastLetter";
        selectedButton.textContent = button.textContent;
        answerContainer.innerHTML += selectedButton.textContent;
        // }
        console.log(selectedButtons);
    });
});


// Funcao para limpar apenas o ultimo caractere
const clearLastLetter = document.getElementById('clearLastLetter');
clearLastLetter.addEventListener('click', function() {
    const answerContainer = document.getElementById('answer-container');
    let removedLetter = selectedButtons.pop();
    answerContainer.innerHTML = answerContainer.innerHTML.slice(0, -1);
    // answerContainer.removeChild(answerContainer.lastChild);

    console.log(">>>", removedLetter);
    console.log(selectedButtons);

})


// Funcao para limpar todos os caracteres
const clearAllLetters = document.getElementById('clearAll');
clearAllLetters.addEventListener('click', function() {
    const answerContainer = document.getElementById("answer-container");
    while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);
        selectedButtons = [];
        console.log(selectedButtons);
    }

})

const validateAnswerBtn = document.getElementById("validateAnswer");
validateAnswerBtn.addEventListener('click', function() {
    validateAnswer(selectedButtons, CORRECT_ANSWER);
    revealImage();
})
