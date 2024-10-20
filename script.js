document.querySelector('.button-rounded').addEventListener('click', function() {
    this.classList.toggle('red');
});




function changeColor(){
    
    button = document.querySelector('.button-rounded')
    button.addEventListener('click', function() {
        // this.classList.toggle('red');
        // if (this.style.backgroundColor === 'red') {
        //     this.style.backgroundColor = '#45a049'; // Change back to green
        // } else {
            button.style.backgroundColor = 'red'; // Change to red
        // }
    });
    
    // button = document.getElementById("L");
    // button.addEventListener("click", () => {
    //     console.log("cor do botao = ", button.style.backgroundColor);
    //     if (button.style.backgroundColor == "rgb(69, 160, 73)"){
    //         button.style.backgroundColor = "rgb(255, 0, 0)";
    //         console.log("nova cor do botao = ", button.style.backgroundColor);
    //     }
    //     else if (button.style.backgroundColor == "rgb(255, 0, 0)"){
    //         button.style.backgroundColor = "rgb(69, 160, 73)";
    //         console.log("cor do botao era vermelha, mudei para verde = ", button.style.backgroundColor);
    //     }
    // })
}



// function changeColor(){
//     const buttons = document.querySelectorAll(".button-rounded");
//     buttons.forEach(button => {
//         button.addEventListener("click", () => {
//             console.log("botao = ", button.style)
//             console.log("cor do botao = ", button.style.backgroundColor)
//             if (button.style.backgroundColor == "rgb(69,160,73)"){
//                 button.style.backgroundColor = "#ff0000";
//             }
//             if (button.style.backgroundColor == "rgb(255,0,0)"){
//                 button.style.backgroundColor = "#45a049";
//             }
//         });
//     })
// }

// changeColor()

// const buttons = document.querySelectorAll(".button-rounded");
// buttons.forEach(button => {
//     // Add a click event listener to each button
//     button.addEventListener('click', function() {
//
//             // Change the button's background color when clicked
//             button.style.backgroundColor = 'red';
//     });
// });
//
// function areTheLettersCorrect(){
//
// }