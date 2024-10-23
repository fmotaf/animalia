function generateRandomUppercaseLetters(count, guaranteedLetters) {
    const letters = new Set(guaranteedLetters); // Start with guaranteed letters in a Set to ensure uniqueness
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Keep adding random letters until the Set has the required number of unique letters
    while (letters.size < count) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        const randomLetter = alphabet[randomIndex];
        letters.add(randomLetter); // Set will only add if the letter is not already in it
    }

    // Convert the Set to an array
    const lettersArray = Array.from(letters);
    // Shuffle the array to mix guaranteed and random letters
    for (let i = lettersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];  // Swap elements
    }
    return lettersArray;
}

// Example usage: Generate 16 random uppercase letters

const randomLetters = generateRandomUppercaseLetters(16, ['L', 'E', 'A', 'O']);
console.log("randomLetters = ", randomLetters);

// const letters = []
// letters.forEach(letter => {
//     letters.push(letter.innerHTML)
// })
// console.log("letters = ", letters)


// Function to shuffle the letters array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

const shuffledLetters = shuffleArray([...randomLetters]);
const buttonContainer = document.getElementById('button-container');

shuffledLetters.forEach(letter => {
    const button = document.createElement('button');
    button.className = 'button-rounded';
    button.textContent = letter;
    buttonContainer.appendChild(button);
});

selectedButtons = []
const buttons = document.querySelectorAll('.button-rounded')

const answerContainer = document.getElementById('answer-container');
console.log("selectedButtons = ", selectedButtons)

buttons.forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('red');
        console.log(this.classList)
        console.log(typeof(this.classList))
        if (this.classList.contains('red')){
            selectedButtons.push(button.textContent);
            const selectedButton = document.createElement('button');
            selectedButton.textContent = button.textContent;
            answerContainer.appendChild(selectedButton);
        }
        console.log(selectedButtons);
    });
});
