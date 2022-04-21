//grab guess from input and store in array 
document.querySelector('#checkButton').addEventListener('click', makeLetterArray)

// reset board
document.querySelector('#resetButton').addEventListener('click', resetScreen)

//Add event listener for Enter key to prevent it from resetting the board
document.addEventListener('keydown', e => {
  if (e.key === "Enter") {
    e.preventDefault();
    makeLetterArray();
  }
})

// Word list - to implement later. Needs a function to randomize which one gets selected
let wordList = ['goget', 'leon!', 'boats', 'float', 'yaaah', 'yuuuh', 'learn', 'house', 'study', 'bezos', 'niche', 'first', 'value', 'slido', 'pizza']


// Initalize variables

let guess = [];
let guessesLeft = true;
let correctWord = wordList[Math.ceil(wordList.length * (Math.random()))].split('');
let guessRow = 0;
let wrongGuesses = [];


// Declare functions

//function to create array of guess input
function makeLetterArray (){
  let word = document.querySelector('#guess').value.toLowerCase();
  document.querySelector('#guess').value = '';
  if (word.length != 5) {
    alert('Guess must have 5 letters.');
     return;
  }
  guess = word.split('');
  checkGuess();
}

// function to compare guess to correct word
// need to improve functionality for duplicate letters in guess but not in answer

function checkGuess(){
  working = []
  if (guessRow < 6) {
    guess.forEach((letter, index) => {
      let idSelector = `Row${guessRow}-Col${index}`;
      document.getElementById(idSelector).innerText = letter;            
      if (guess[index] == correctWord[index]) {
        document.getElementById(idSelector).style.background = 'rgb(121, 177, 90)';
        working.push(letter)
      } else if (correctWord.includes(letter)){
        document.getElementById(idSelector).style.background = 'rgb(253, 203, 88)';
        working.push(letter)
      } else {
        document.getElementById(idSelector).style.background = 'rgba(69, 76, 90, .75)'; 
        wrongGuesses.push(letter);
      }
    })
    guessRow++
  } else {
    alert(`The correct word was ${correctWord.join('')}, you lose.`)
    resetScreen()
  }
  if (working.join('') === correctWord.join('')) {
    alert(`${working.join('')} is correct, you win!`)
    resetScreen()
  }
}

// Reset button to clear the DOM
function resetScreen() {
  let rows = document.querySelectorAll('.guessRow');
  for (let i=0; i <= 5; i++){
    let row = rows[i];
    for (let j=0; j <5; j++){
      let cell = row.children[j]
      cell.innerText ='';
      cell.style.background = 'lightgrey';
    }
  }
  //Reset the guessRow
  guessRow = 0;
  
  //Reset the correctWord to a new one in the list
  correctWord = wordList[Math.ceil(wordList.length * (Math.random()))].split('');
  
  //Reset input value 
document.querySelector('#guess').value = '';
}
