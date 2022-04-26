document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;
    let word = "bajan";
    let guessedWordCount = 0;
    let guessed = false;

    const keys = document.querySelectorAll(".keyboard-row button");


    function getTileColor(letter, index){
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter){
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);

        if (isCorrectPosition){
            return "rgb(83, 141, 78)";

        }
        

        return "rgb(181, 159, 59)";
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
                    letterEl.classList.add("animate__flipInX");
                    letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;

                    //currWord.push(letter);
                    //console.log(currWord);
                }, interval * index);

            
            });

            guessedWordCount += 1;

        

            //const currentWord = currWord;
            const currentWord = currentWordArr.join("");
            console.log(currentWord);
            console.log(word)

            if (currentWord === word){
                guessed = true;
                window.alert("Congratulations!");
            }

            if(guessedWords.length === 6){
                window.alert(`Sorry you have no more guesses! The word is ${word}.`)
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