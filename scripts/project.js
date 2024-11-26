// variables
const btn_group_letters = document.getElementById("group_btn_letters")
const hangman_word = document.getElementById("hangman_word")
const hangman_hint = document.getElementById("hangman_hint")
const hangman_image = document.getElementById("hangman_image")
const btn_new_game = document.getElementById("btn_new_game")
const btn_close = document.getElementById("btn-close")
const pop_up_div = document.getElementById("pop_up_div")
const pop_up_game_result = document.getElementById("pop_up_game_result")
const pop_up_game_result_answer = document.getElementById("pop_up_game_result_answer")
let gameResultAnimation;
let entered_letters = []
let num_incorrect_guesses = 0
let correct_guesses = 0
let gameOver = false
let hangman_answer = ""
let max_incorrect_guesses = 6
let timeOut;


// Create object htmlUpdated that includes html update methods
class htmlUpdated
{
    imageHTML(numOfIncorrectGuesses)
    {
        return `<a><img id="hangman_image_1" src="../images/hangman_${numOfIncorrectGuesses}.png" alt="hangman"></a>`
    }

    wordHTML(isVisible, answerChar)
    {
        if(isVisible)
        {
            return `<section class="hangman_answer"><h3 class="visible_answer">${answerChar}</h3></section>`
        }
        else
        {
            return `<section class="hangman_answer"><h3 class="invisible_answer">${answerChar}</h3></section>`
        }
    }

    btnHTML(letter)
    {
        return `<button class="btn_letters" id="btn_letter_${letter}" type="button" onclick="btnClicked ('${letter}')">${letter.toUpperCase()}</button>`
    }

    hintHTML(hint)
    {
        return `<p>${hint}</p>`
    }

    gameResultHTML(isWin)
    {
        if(isWin) {return "YOU WIN!"}
        else{return "YOU LOSE!"}
    }

    gameResultAnswer(answer)
    {
        return "The answer is " + answer + "!"
    }
}


const gameA = new htmlUpdated()
resetAnswerHint()
resetImage()
resetLetterBtn()

// New Game
btn_new_game.addEventListener("click", function () {
    entered_letters = []
    btn_group_letters.innerHTML = ""
    num_incorrect_guesses = 0
    gameOver = false
    correct_guesses = 0
    pop_up_div.style.opacity = 0
    resetAnswerHint()
    resetImage()
    resetLetterBtn()
})

// popup play again button
btn_close.addEventListener('click', function(){
    pop_up_div.style.opacity = 0
    entered_letters = []
    btn_group_letters.innerHTML = ""
    num_incorrect_guesses = 0
    gameOver = false
    correct_guesses = 0
    pop_up_div.style.opacity = 0
    btn_new_game.disabled = false
    resetAnswerHint()
    resetImage()
    resetLetterBtn()
});

// Reset hangman answer and hint
function resetAnswerHint() {
    fetch("../data/data.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            hangman_word.innerHTML = ""
            const hangmanData = data[(Math.floor(Math.random() * data.length))]
            console.log(hangmanData);
            hangman_hint.innerHTML = gameA.hintHTML(hangmanData['hint'])
            hangman_answer = hangmanData['answer']
            const hangman_answer_array = hangman_answer.split('')
            for (let answer_char of hangman_answer_array) {
                hangman_word.innerHTML += gameA.wordHTML(false, answer_char)
            }
        });
}

// Reset image according to the number of incorrect guesses
function resetImage() {
    hangman_image.innerHTML = gameA.imageHTML(num_incorrect_guesses)
}

// Reset letter buttons
function resetLetterBtn() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let letter;
    for (letter of letters) {
        const strLetter = gameA.btnHTML(letter)
        btn_group_letters.innerHTML += strLetter
    }
}


//btnClicked function
//check if the letter entered match any letter of the answer
function btnClicked(letterEntered) {
    let hangman_word_updated = ""
    const btn_letter_clicked = document.getElementById(`btn_letter_${letterEntered}`)
    btn_letter_clicked.style.backgroundColor = "lightgray"
    btn_letter_clicked.style.color = "gray"
    btn_letter_clicked.disabled = true
    entered_letters.push(letterEntered)
    const hangman_answer_array = hangman_answer.split('')
    const required_num_correct_guesses = new Set(hangman_answer_array).size
    for (let letter of hangman_answer) {
        if (entered_letters.includes(letter)) {
            hangman_word_updated += gameA.wordHTML(true, letter)
        } else {
            hangman_word_updated += gameA.wordHTML(false, letter)
        }
    }

    if (hangman_word.innerHTML === hangman_word_updated) {
        num_incorrect_guesses++
    } else {
        correct_guesses++
    }
    hangman_word.innerHTML = hangman_word_updated
    console.log("wrong guesses: " + num_incorrect_guesses)
    hangman_image.innerHTML = gameA.imageHTML(num_incorrect_guesses)

    if (correct_guesses === required_num_correct_guesses) {
        gameOver = true
        pop_up_game_result.innerHTML = gameA.gameResultHTML(true)
        pop_up_game_result_answer.innerHTML = gameA.gameResultAnswer(hangman_answer)
        pop_up_div.style.opacity = 1
        clearTimeout(timeOut)
        gameResultAnimation = requestAnimationFrame(popupAnimation)
        console.log("WIN")
    } else if (num_incorrect_guesses >= max_incorrect_guesses) {
        gameOver = true
        pop_up_game_result.innerHTML = gameA.gameResultHTML(false)
        pop_up_game_result_answer.innerHTML = gameA.gameResultAnswer(hangman_answer)
        pop_up_div.style.opacity = 1
        clearTimeout(timeOut)
        gameResultAnimation = requestAnimationFrame(popupAnimation)
        console.log("LOSE")
    }


    if (gameOver) {
        let btn_letter;
        for (btn_letter of document.getElementsByClassName('btn_letters')) {
            btn_letter_clicked.style.backgroundColor = "lightgray"
            btn_letter_clicked.style.color = "gray"
            btn_letter.disabled = true
            btn_new_game.disabled = true
        }
    }
}

let resultColorRed = true
function popupAnimation()
{
    timeOut = setTimeout(function () {
        if (resultColorRed) {
            pop_up_game_result.style.color = "green";
            resultColorRed = false
        } else {
            pop_up_game_result.style.color = "red"
            resultColorRed = true
        }
        gameResultAnimation = requestAnimationFrame(popupAnimation)
    }, 750)}























