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
    let localWordStore = ["","","","","",""];
    let correctLetterColour = "rgb(83, 141, 78)";
    let wrongLetterPosColour = "rgb(181, 159, 59)";
    let wrongLetterColour = "rgb(58, 58, 60)";

    let correctColourEmoji = "🟩";
    let wrongPosColourEmoji = "🟨";
    let wrongColourEmoji = "⬛";

    let availableSpace = 1;
    let word = wordClone = "bajan";
    let guessedWordCount = 0;
    let incorrectPosCount = 0;
    let guessed = false;
    let shareButton = document.getElementById("sharebutton");
    let statsButton = document.getElementById("statistics-button");
    let statsButtonClose = document.getElementById("dismissStats");
    $('#exampleModal').modal({ show: false});

    const keys = document.querySelectorAll(".keyboard-row button");

    const sCtx = document.getElementById('statsChart').getContext('2d');
    
    const labels = ["1","2","3","4","5","6"];
    const data = {
    labels: labels,
    datasets: [{
        axis: 'y',
        label: '',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)'
        ],
        borderWidth: 1
    }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    display: false
                }
            }
        },
      };

    const statsChart = new Chart(sCtx, config);  

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
    
    statsButton.addEventListener('click', event => {
        $('#statisticsModal').modal('show');
    });  

    statsButtonClose.addEventListener('click', event => {
        console.log("Clicked dismiss");
        $('#statisticsModal').modal('hide');
    })


    function getTileColor(letter, index){
        const isCorrectLetter = wordClone.includes(letter);
        // for(var i=0; i<word.length; i++)
        //     {
        //         if()
        //     }
        console.log("wordclone: " + wordClone);

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

    function handleSubmitHistory(){
        const interval = 200;

        let currWord = [];


        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);
                wordClone = wordClone.split('');
                selectedIndex = wordClone.indexOf(letter);
                if (selectedIndex > -1)
                    wordClone.splice(selectedIndex, 1);

                wordClone = wordClone.join('');
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                console.log("gwc: " + guessedWordCount);
                console.log("text: " + guessedWordsText.length);

                if (tileColor == correctLetterColour)
                    guessedWordsText += correctColourEmoji;
                if (tileColor == wrongLetterPosColour)
                    guessedWordsText += wrongPosColourEmoji;
                if (tileColor == wrongLetterColour)
                    guessedWordsText += wrongColourEmoji;

                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;

                //currWord.push(letter);
                //console.log(currWord);
            }, interval * index);


        });
        setTimeout(() => {
            guessedWordsText += "\n";
            wordClone = word;
        }, ((interval * 5) + 1));

        guessedWordCount += 1;



        //const currentWord = currWord;
        const currentWord = currentWordArr.join("");
        console.log(currentWord);
        console.log(word)
        localWordStore[guessedWordCount - 1] = currentWord;
        localStorage.setItem("boardstate", localWordStore);

        if (currentWord === word) {
            guessed = true;
            //window.alert("Congratulations!");
            setTimeout(() => {
                $('#statisticsModal').modal('show')
            }, ((interval * 5) + 1));
        }

        if (guessedWords.length === 6 && currentWord !== word) {
            //window.alert(`Sorry you have no more guesses! The word is ${word}.`)
            guessedWordCount = "X";
            setTimeout(() => {
                $('#statisticsModal').modal('show')
            }, ((interval * 5) + 1));
        }

        guessedWords.push([]);
        
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
                    wordClone = wordClone.split('');
                    selectedIndex = wordClone.indexOf(letter);
                    if(selectedIndex > -1)
                        wordClone.splice(selectedIndex, 1);

                    wordClone = wordClone.join('');
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
            setTimeout(() => {
                guessedWordsText += "\n";
                wordClone = word;
            }, ((interval * 5)+1));

            guessedWordCount += 1;

        

            //const currentWord = currWord;
            const currentWord = currentWordArr.join("");
            console.log(currentWord);
            console.log(word)
            localWordStore[guessedWordCount-1] = currentWord;
            localStorage.setItem("boardstate", localWordStore);

            if (currentWord === word){
                guessed = true;
                //window.alert("Congratulations!");
                setTimeout(() => {$('#statisticsModal').modal('show')}, ((interval * 5)+1)); 
            }

            if(guessedWords.length === 6 && currentWord !== word){
                //window.alert(`Sorry you have no more guesses! The word is ${word}.`)
                guessedWordCount = "X";
                setTimeout(() => {$('#statisticsModal').modal('show')}, ((interval * 5)+1));
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

        if(localStorage.getItem("boardstate"))
        {
            localWordStore = localStorage.getItem("boardstate");
            console.log("Reading local storage");
            console.log(localWordStore);
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