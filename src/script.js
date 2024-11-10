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
        // console.log(this.classList)
        // console.log(typeof(this.classList))
        // if (this.classList.contains('red')){
        selectedButtons.push(button.textContent);
        const selectedButton = document.createElement('p');
        selectedButton.id = "lastLetter";
        selectedButton.textContent = button.textContent;
        answerContainer.innerHTML += selectedButton.textContent;
        // }
        // console.log(selectedButtons);
    });
});

// function removeLastLetter(element) {
//     console.log("element = ", element)
//     console.log("element.innerHTML = ", element.innerHTML)
//     element.innerHTML = element.innerHTML.slice(0, -1);
// }

// const clearLastLetter = document.getElementById('clearLastLetter');
// clearLastLetter.addEventListener('click', () => removeLastLetter(answerContainer));

// // Funcao para limpar apenas o ultimo caractere
// const clearLastLetter = document.getElementById('clearLastLetter');
// clearLastLetter.addEventListener('click', function() {
//     // const answerContainer = document.getElementById('answer-container');
//     console.log("selected buttons before = ", selectedButtons);
//     selectedButtons.pop();
//     console.log("selected buttons = ", selectedButtons);
//     answerContainer.innerText = '';
//     selectedButtons.forEach(letter => {
//         console.log(letter);
//         answerContainer.innerText += letter;
//         console.log(answerContainer.innerText);
//     })
//
//     // answerContainer.innerText = removedLetter;
//     // answerContainer.innerText = answerContainer.innerText.substring(0, answerContainer.innerHTML.length -1);
//     // answerContainer.removeChild(answerContainer.lastChild);
//     console.log("--->>>", answerContainer.firstChild);
//     console.log(">>>", answerContainer.innerText);
//     console.log(selectedButtons);
//
// })

// Funcao para limpar alguns caracteres
const clearLastLetter = document.getElementById('clearLastLetter');
clearLastLetter.addEventListener('click', function() {
    const answerContainer = document.getElementById('answer-container');
    // let arrayAnswerContainer = [];
    // arrayAnswerContainer

    let lastLetter = selectedButtons.pop();
    answerContainer.innerHTML = answerContainer.innerHTML.slice(0, -1);
    console.log('last letter = ', lastLetter);
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
})
