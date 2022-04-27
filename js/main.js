// const express = require("express")
// const mongoose = require("mongoose") // new

// // Connect to MongoDB database
// mongoose
// 	.connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
// 	.then(() => {
// 		const app = express()

// 		app.listen(5000, () => {
// 			console.log("Server has started!")
// 		})
// 	})
$(document).ready(function(){

//document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let guessedWordsText = "";
    let correctLetterColour = "rgb(83, 141, 78)";
    let wrongLetterPosColour = "rgb(181, 159, 59)";
    let wrongLetterColour = "rgb(58, 58, 60)";

    let correctColourEmoji = "🟩";
    let wrongPosColourEmoji = "🟨";
    let wrongColourEmoji = "⬛";

    let availableSpace = 1;
    let word = "bajan";
    let guessedWordCount = 0;
    let guessed = false;
    let shareButton = document.getElementById("sharebutton");
    $('#exampleModal').modal({ show: false});

    const keys = document.querySelectorAll(".keyboard-row button");

    shareButton.addEventListener('click', event => {
        if (navigator.share) {
          navigator.share({
            title: 'WebShare API Demo',
            text: "Bimdle " + guessedWordCount + "/6\n\n" + guessedWordsText
          }).then(() => {
            console.log('Thanks for sharing!');
          })
          .catch(console.error);
        } else {
          // fallback
        }
      });


    function getTileColor(letter, index){
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter){
            return wrongLetterColour;
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);

        if (isCorrectPosition){
            return correctLetterColour;

        }
        

        return wrongLetterPosColour;
    }
   

    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr()
       
        
        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        let currWord =[];
        if(currentWordArr.length !== 5){
            window.alert("Word must be 5 letters");
            return;
        }
        else
        {
            
            currentWordArr.forEach((letter, index) => {
                setTimeout(() => {
                    const tileColor = getTileColor(letter, index);
                    const letterId = firstLetterId + index;
                    const letterEl = document.getElementById(letterId);
                    console.log("gwc: " + guessedWordCount);
                    console.log("text: " + guessedWordsText.length);

                    if(tileColor == correctLetterColour)
                        guessedWordsText += correctColourEmoji;
                    if(tileColor == wrongLetterPosColour)
                        guessedWordsText += wrongPosColourEmoji;
                    if(tileColor == wrongLetterColour)
                        guessedWordsText += wrongColourEmoji;    
                        
                    letterEl.classList.add("animate__flipInX");
                    letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;

                    //currWord.push(letter);
                    //console.log(currWord);
                }, interval * index);

            
            });
            setTimeout(() => {guessedWordsText += "\n";}, ((interval * 5)+1));

            guessedWordCount += 1;

        

            //const currentWord = currWord;
            const currentWord = currentWordArr.join("");
            console.log(currentWord);
            console.log(word)

            if (currentWord === word){
                guessed = true;
                //window.alert("Congratulations!");
                $('#exampleModal').modal('show'); 
            }

            if(guessedWords.length === 6){
                //window.alert(`Sorry you have no more guesses! The word is ${word}.`)
                $('#exampleModal').modal('show');
            }

            guessedWords.push([]);
        }
    }

    function getCurrentWordArr(){
        const numberOfGuessedWords = guessedWords.length;

        return guessedWords[numberOfGuessedWords - 1]
    }

    function deleteLetter()
    {
       console.log("Deleting: ");
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length > 0){
            guessedWords[guessedWords.length - 1].pop();

            const availableSpaceEl = document.getElementById(availableSpace - 1);
            availableSpace = availableSpace - 1;

            availableSpaceEl.textContent = "";
           
        }

    }

    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr()

        if (currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(availableSpace)
            availableSpace = availableSpace + 1

            availableSpaceEl.textContent = letter;
        }
    }
    
    function createSquares(){
        const gameBoard = document.getElementById("board")

        for(let index=0; index < 30; index++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    
        for(let i = 0; i< keys.length; i++)
        {
            keys[i].onclick = ({ target }) => {
                if(!guessed)
                {
                    const letter = target.getAttribute("data-key");

                    if(letter === 'enter')
                    {
                        handleSubmitWord();
                        return;
                    }

                    if(letter === 'del')
                    {
                        deleteLetter();
                        return;
                    }

                    updateGuessedWords(letter)
                }
            };
        }
    
})