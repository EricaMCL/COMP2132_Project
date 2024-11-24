// variables
const btn_group_letters = document.getElementById("group_btn_letters")
const hangman_word = document.getElementById("hangman_word")
const hangman_hint = document.getElementById("hangman_hint")
const hangman_image = document.getElementById("hangman_image")
const btn_new_game = document.getElementById("btn_new_game")
let entered_letters = []
let num_incorrect_guesses = 0
let correct_guesses = 0
let gameOver = false
let restartGame = false
let isWin = false
let hangman_answer = ""


function get_answer_n_hint() {
    fetch("../data/data.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            hangman_word.innerHTML = ""
            const a = myJson[(Math.floor(Math.random() * myJson.length))]
            console.log(a);
            console.log(a['answer'])
            console.log(a['hint'])
            hangman_hint.innerHTML = `<p>${a['hint']}</p>`
            hangman_answer = a['answer']
            const hangman_answer_array = hangman_answer.split('')
            for (let answer_char of hangman_answer_array) {
                hangman_word.innerHTML += `<section class="hangman_answer"><h3 class="invisible_answer">${answer_char}</h3></section>`
            }
        });
}

get_answer_n_hint()


hangman_image.innerHTML = `<a><img id="hangman_image_1" src="../images/hangman_${num_incorrect_guesses}.png" alt="hangman"></a>`
console.log("image")

//generates the word guessing section with hidden answer

//const hangman_answer_array = hangman_answer.split('')
//const required_num_correct_guesses = new Set(hangman_answer_array).size

//for (let answer_char of hangman_answer_array) {
//hangman_word.innerHTML += `<section class="hangman_answer"><h3 class="invisible_answer">${answer_char}</h3></section>`
//}


//generates letter select buttons
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function letter_btn_generator(letter) {
    return `<button class="btn_letters" id="btn_letter_${letter}" type="button" onclick="btnClicked ('${letter}')">${letter.toUpperCase()}</button>`
}

let letter;
for (letter of letters) {
    const strLetter = letter_btn_generator(letter)
    btn_group_letters.innerHTML += strLetter
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
            hangman_word_updated += `<section class="hangman_answer"><h3 class="visible_answer">${letter}</h3></section>`
        } else {
            hangman_word_updated += `<section class="hangman_answer"><h3 class="invisible_answer">${letter}</h3></section>`
        }
    }

    if (hangman_word.innerHTML === hangman_word_updated) {
        num_incorrect_guesses++
    } else {
        correct_guesses++
    }
    hangman_word.innerHTML = hangman_word_updated
    console.log(num_incorrect_guesses)
    hangman_image.innerHTML = `<a><img id="hangman_image_1" src="../images/hangman_${num_incorrect_guesses}.png" alt="hangman"></a>`

    if (correct_guesses === required_num_correct_guesses) {
        isWin = true
        gameOver = true
        console.log("WIN")
    } else if (num_incorrect_guesses >= 6) {
        gameOver = true
        console.log("LOSE")
    }


    if (gameOver) {
        let btn_letter;
        for (btn_letter of document.getElementsByClassName('btn_letters')) {
            btn_letter_clicked.style.backgroundColor = "lightgray"
            btn_letter_clicked.style.color = "gray"
            btn_letter.disabled = true
        }


    }

}

    btn_new_game.addEventListener("click", function () {
        entered_letters = []
        btn_group_letters.innerHTML = ""
        num_incorrect_guesses = 0
        hangman_image.innerHTML = `<a><img id="hangman_image_1" src="../images/hangman_${num_incorrect_guesses}.png" alt="hangman"></a>`
        gameOver = false
        correct_guesses = 0
        let letter;
        let strLetter;
        for (letter of letters) {
            strLetter = letter_btn_generator(letter)
            btn_group_letters.innerHTML += strLetter
        }
        get_answer_n_hint()

    })






















