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

    let guessedWords = [[]];
    let guessedWordsText = "";
    let guessedColours = [[]];
    let localWordStore = [[]];
    let localWordColour = [[]];
    let localBoardObj = null;
    let localLastPlayedTime = Date.now();
    let localGuessedWords = [];
    let localGuessedWordCount = 0;
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
    let settingsButton = document.getElementById("settings-button");
    let settingsButtonClose = document.getElementById("dismissSettings");
    let guessedStats = [0,0,0,0,0,0]; 

    createSquares();


    $('#exampleModal').modal({ show: false});

    const keys = document.querySelectorAll(".keyboard-row button");

    const sCtx = document.getElementById('statsChart').getContext('2d');
    
    const labels = ["1","2","3","4","5","6"];
    const data = {
    labels: labels,
    datasets: [{
        axis: 'y',
        label: '',
        data: guessedStats,
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

    settingsButton.addEventListener('click', event => {
        $('#settingsModal').modal('show');
    })

    settingsButtonClose.addEventListener('click', event => {
        $('#settingsModal').modal('hide');
    })

    function clearLocalStorage()
    {
        localStorage.clear();
    }


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
   

    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr()
        
        
        console.log("Guessed Count: " + guessedWordCount);
        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        let currWord =[];
        let currWordColour =[];
        if(currentWordArr.length !== 5){
            window.alert("Word must be 5 letters");
            return;
        }
        else
        {
            localWordStore.push(currentWordArr);
            
            currentWordArr.forEach((letter, index) => {
                const tileColor = getTileColor(letter, index);
                localWordColour[localWordColour.length - 1].push(tileColor);
                guessedColours[guessedColours.length - 1].push(tileColor);
                setTimeout(() => {
                    //const tileColor = getTileColor(letter, index);
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
                    currWord[index] = tileColor;

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
           
            console.log("SubmitWord words arr");
            console.log(guessedWords);
            console.log("SubmitWord colours arr");
            console.log(guessedColours);
            
            //localWordColour[guessedWordCount-1] = currWord;
            localStorage.setItem("boardstate", localWordStore);
            //localStorage.setItem("colourstate", localWordColour);
            let boardObj = {boardstate: guessedWords, colourstate: guessedColours, lastPlayed: Date.now()};
            localStorage.setItem("boardObj", JSON.stringify(boardObj));

            if (currentWord === word){
                guessed = true;
                //window.alert("Congratulations!");
                guessedStats[localGuessedWordCount] += 1;
                removeData(statsChart);
                addData(statsChart, '', guessedStats);
            
                setTimeout(() => {$('#statisticsModal').modal('show')}, ((interval * 5)+1)); 
                
            }

            if(guessedWords.length === 6 && currentWord !== word){
                //window.alert(`Sorry you have no more guesses! The word is ${word}.`)
                guessedWordCount = "X";
                setTimeout(() => {$('#statisticsModal').modal('show')}, ((interval * 5)+1));
            }

            guessedWords.push([]);
            guessedColours.push([]);
        }
    }

    function handleSubmitHistory(){
        const interval = 200;
 
        let currWord = [];
        guessedWords.pop();
        guessedColours.pop();
        localWordStore = localBoardObj.boardstate;
        localWordColour = localBoardObj.colourstate;
        console.log("Reading local storage");
        console.log(localWordStore);
        console.log(localGuessedWordCount);
        // let wordHistory = localWordStore.split(",");
        // let colourHistory = localWordColour.split(",");
        // console.log(wordHistory);
        // let localWordCount = wordHistory.length/5;
        //console.log(localWordCount);    
        const currentWordArr = getCurrentWordArr();

        

        for(let i=0; i<localGuessedWordCount; i++)
        {
            currWord = [];
            console.log("Pass #" + i);
            for(let j=0; j<localWordStore[i].length; j++)
            {
                //guessedWords.push(localWordStore[i][j]);
                let index = (i*5) + j;
                console.log(index);
                //console.log(wordHistory[index]);
                console.log("Local letter: " + localWordStore[i][j]);

                //currentWordArr.push(wordHistory[index]);
                //currWord.push(wordHistory[index]);
                availableSpace += 1;
                setTimeout(() => {
                    //const tileColor = localWordColour[index];
                    const tileColor = localWordColour[i][j];
                    console.log("In timeout");
                    console.log(index);
                  
                    const letterId = index+1;
                    const letterEl = document.getElementById(letterId);
                    console.log("Letter ID: " + letterId);
                    // console.log("gwc: " + guessedWordCount);
                    // console.log("text: " + guessedWordsText.length);
    
                    if (tileColor == correctLetterColour)
                        guessedWordsText += correctColourEmoji;
                    if (tileColor == wrongLetterPosColour)
                        guessedWordsText += wrongPosColourEmoji;
                    if (tileColor == wrongLetterColour)
                        guessedWordsText += wrongColourEmoji;
    
                    letterEl.classList.add("animate__flipInX");
                    letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;

                    const availableSpaceEl = document.getElementById(letterId);
        
                    availableSpaceEl.textContent = localWordStore[i][j];
    
                    //currWord.push(letter);
                    //console.log(currWord);
                    
                }, interval * (j));
                //guessedWords.push(localWordStore[i][j]);
                //guessedWords.push(localWordStore[j]);
                //updateGuessedWords(localWordStore[i][j]);
            }
            guessedWords.push(localWordStore[i]);
            guessedColours.push(localWordColour[i]);
            guessedWordCount += 1;
            
        }

        console.log("Available Space " + availableSpace);

        const currentWord = guessedWords[guessedWords.length - 1].join("");
        console.log(currentWord);
        // console.log(word)
        

        if (currentWord === word) {
            guessed = true;
            //window.alert("Congratulations!");
            let num = 0;
            num = guessedStats[guessedWordCount-1];
            console.log("num: " + num);
            guessedStats[guessedWordCount-1] = num+1;
            console.log("guessed Stats");
            console.log(guessedStats);
           
            removeData(statsChart);
            addData(statsChart, '', guessedStats);
            
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
        guessedColours.push([]);
    }

    function getCurrentWordArr(){
        const numberOfGuessedWords = guessedWords.length;

        return guessedWords[numberOfGuessedWords - 1]
    }

    function getLocalCurrentWordArr(){
        const numberOfGuessedWords = localGuessedWords.length;

        return localGuessedWords[numberOfGuessedWords - 1];
    }

    function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }
    
    function removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
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

    /* 
    We have a function to update the board with a new letter as you get it.
    Want to adapt this to pull from already guessed words in local storage
    So gotta use a for/while loop.

    While going through a word, we need a local index to know which prior guessed word we're at.
    So we need a local variant, localGuessedWords.


    In updateGuessedWords:
    updateGuessedWords doesn't care about how many prior guessed words they are, just that the current word being guessed 
    doesn't go above the limits of the 5 letter space. 
    It also cares about getting ids from the page based on the index given, and the letter to put in the space based on what
    is fed as param.

    Available space would need to be replaced with a local variant. LocalASpace.

    */

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

    /*  Get Last Played timestamp from local storage
        Check if ts is the same day as curr ts generated on load
        If it is, then pull other localstorage items dealing with board state.
        If it isn't, then clear other localstorage items dealing with board state and then update ts.

    */ 

        //clearLocalStorage();
        if(localStorage.getItem("lastPlayed"))
        {
            let today = Date.now();
            let localDate = localStorage.getItem("lastPlayed");
            //localStorage.removeItem("boardObj");
            //Need to convert timestamp from localstorage to something that works with Date functions

            let todayDay = new Date(today).setHours(0,0,0,0);
            let localDay = new Date(parseInt(localDate)).setHours(0,0,0,0); 
            if(todayDay === localDay)
            {
                console.log("Same Day");
                console.log(localDate);
                if(localStorage.getItem("boardObj"))
                {
                    localBoardObj = JSON.parse(localStorage.getItem("boardObj"));

                    //localWordColour = localStorage.getItem("colourstate");
                    localGuessedWordCount = localBoardObj.boardstate.length;
                    console.log("length of store: " +  localBoardObj.boardstate.length);
                    //console.log(localWordColour);
                    handleSubmitHistory();
                    

                    console.log("Guessed word count: " + guessedWordCount);
                    console.log("GuessedWords arr");
                    console.log(guessedWords);

                    console.log("GuessedColours arr");
                    console.log(guessedColours);
                    //While localWords length hasn't been reached
                    //    handleSubmitHistory();
                    //Endwhile
                }
            }else{
                console.log("Not the same day!");
                console.log(localDate);
                console.log(typeof(today));
                console.log(typeof(todayDay));
                console.log(typeof(localDay));
                console.log(typeof(localDate));
                localStorage.setItem("lastPlayed", today);
                // localStorage.removeItem("boardstate");
                // localStorage.removeItem("colourstate");
            }
        }
        else
        {
            let today = Date.now();
            localStorage.setItem("lastPlayed", today);
            //console.log("length of store: " +  localWordStore.length);
        }


        // if(localStorage.getItem("boardstate"))
        // {
        //     // localWordStore = localStorage.getItem("boardstate");
        //     // console.log("Reading local storage");
        //     // console.log(localWordStore);
        //     // let wordHistory = localWordStore.split(",");
        //     // console.log(wordHistory);
        //     // let localWordCount = wordHistory.length/5;
        //     // console.log(localWordCount);

        //     // for(let i=0; i<localWordCount; i++)
        //     // {
        //     //     console.log("Pass #" + i);
        //     //     for(let j=0; j<5; j++)
        //     //     {
        //     //         console.log(wordHistory[(i*5)+j]);
        //     //     }
        //     // }

        //     //localWordColour = localStorage.getItem("colourstate");

        //     handleSubmitHistory();
        //     console.log("First Letter ID: " + (guessedWordCount * 5 + 1));
        // }
    
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