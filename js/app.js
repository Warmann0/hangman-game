/*
1. Start the game:
   - Make/find a list of words to choose from
   - Pick a random word from the list
   - Hide the word by showing underscores _ for each letter
   - Set a limit for wrong guesses
   - Make empty lists to keep track of correct and wrong guesses
   - Show everything on the main screen

2. Set up the screen:
   - Add buttons or allow keyboard input for guessing the letters
   - Show how many tries are left.
   - Have a figure or something to show progress.

3. When a letter is guessed:
   - Check if the letter was already guessed
   - If the letter is in the word
     - Show it in the correct spots
     - Check if the whole word is guessed = User wins
   - If the letter is NOT in the word:
     - Take away one try
     - Update the figure/progress visually d
     - If no tries are left = User loses

4. Winning or losing:
   - If the player figures out the word show a "yayzz!" message
   - If the player runs out of tries show "you suck" and reveal the word
   - Add a button to restart the game

5. Restarting:
   - Reset everything
   - Pick a new word
   - Empty the guessed letters
   - Reset the screen
   - allow the player to try again

*/  




/*-------------------------------- Constants --------------------------------*/
const wordDisplay = document.querySelector(".word-display")

const hangmanImage = document.querySelector(".hangman-box img")

const guessesText = document.querySelector(".guesses-text b")

const keyboardDiv = document.querySelector(".keyboard")

const gameModal = document.querySelector(".game-modal")

let currentWord, correctLetters = [], worngGuessCount = 0
const maxGusses = 6;

const getRandomWord = () => {
   // selecting a word and hint from wordList
   const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
   currentWord = word;
   console.log(word)
   document.querySelector(".hint-text b").innerText = hint;
   wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const gameOver = (isVictory) => {
   setTimeout(() => {
      const modalText = isVictory ? `Boom! you got it ` : `it was `
      gameModal.querySelector("img").src = `images/${isVictory ? `victory` : `lost`}.gif`;
      gameModal.querySelector("h4").innerText = `${isVictory ? `congrats!` : `Game Over`}.gif`;
      gameModal.querySelector("p").innerHTML = `${modalText}`

      gameModal.classList.add("show");
   }, 300);
}

// checking if the letter clicked is within the word
const initGame = (button, clickedLetter) => {
   // showing all correct letters on the word-display
   if(currentWord.includes(clickedLetter)) {
      [...currentWord].forEach((letter, index) => {
         if(letter === clickedLetter) {
            correctLetters.push(letter)
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
         }
      })
   } 
   else {
      // when clicked and letter is wrong update the attamptes and the image
      worngGuessCount++;
      hangmanImage.src = `images/hangman-${worngGuessCount}.svg`;
   }
   button.disabled = true;
   guessesText.innerText = `${worngGuessCount} / ${maxGusses}`;

   // calling gameOver => if any of this happens
   if(worngGuessCount === maxGusses) return gameOver(true); 
   if(correctLetters.length === currentWord.length) return gameOver(true); 
}


// creates keyboard buttons + event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
 }
 
 getRandomWord ();
 
 /*---------------------------- Variables (state) ----------------------------*/
 
 
 /*------------------------ Cached Element References ------------------------*/
 
 
 /*-------------------------------- Functions --------------------------------*/
 
 
 /*----------------------------- Event Listeners -----------------------------*/
 
 