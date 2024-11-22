

// function to generate the letters and display in screen
export function generateRandomUppercaseLetters(count) {
    const letters = new Set(); // Start with guaranteed letters in a Set to ensure uniqueness
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


// Function to shuffle the letters array`
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}


// Function to validate the player's answer
export function validateAnswer(selectedButtons, CORRECT_ANSWER) {
    const playerAnswer = selectedButtons.join('');
    const correctAnswerStr = CORRECT_ANSWER.join('');

    if (playerAnswer === correctAnswerStr) {
        alert("Correct! You've guessed the animal!");
        revealImage();
        return true;
    } else {
        alert("Incorrect! Try again.");
        return false;
    }
}

export function revealImage() {
    const animalImage = document.getElementById('animal-image');
    animalImage.style.filter = 'blur(0)'; // Remove blur to reveal image
}
