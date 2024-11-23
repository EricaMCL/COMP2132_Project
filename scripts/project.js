// variables
const btn_group_letters = document.getElementById("group_btn_letters")
const hangman_word = document.getElementById("hangman_word")
const hangman_hint = document.getElementById("hangman_hint")
const hangman_image = document.getElementById("hangman_image")
const hangman_answer = "apple"
const entered_letters = []
let num_incorrect_guesses = 0


hangman_image.innerHTML = `<a><img id="hangman_image_1" src="../images/hangman_${num_incorrect_guesses}.png" alt="hangman"></a>`
hangman_hint.innerHTML = "<p>HINT: A Fruit</p>"


//generates letter select buttons
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function letter_btn_generator(letter) {
    return `<button class="btn_letters" id="btn_letter_${letter}" type="button" onclick="btnClicked('${letter}')">${letter.toUpperCase()}</button>`
}

//generates the word guessing section with hidden answer
for (letter of letters) {
    const strLetter = letter_btn_generator(letter)
    btn_group_letters.innerHTML += strLetter
}

for (letter of hangman_answer.split(''))
{
    hangman_word.innerHTML += `<section class="hangman_answer"><h3 class="invisible_answer">${letter}</h3></section>`
}

//btnClicked function
//check if the letter entered match any letter of the answer
function btnClicked(letterEntered)
{
    let hangman_word_updated = ""
    const btn_letter_clicked = document.getElementById(`btn_letter_${letterEntered}`)
    btn_letter_clicked.style.backgroundColor = "lightgray"
    btn_letter_clicked.style.color = "gray"
    btn_letter_clicked.disabled = true
    entered_letters.push(letterEntered)

    for (let letter of hangman_answer)
    {
        if (entered_letters.includes(letter)) {
            hangman_word_updated += `<section class="hangman_answer"><h3 class="visible_answer">${letter}</h3></section>`
        } else {
            hangman_word_updated += `<section class="hangman_answer"><h3 class="invisible_answer">${letter}</h3></section>`
        }
    }

if(hangman_word.innerHTML === hangman_word_updated){num_incorrect_guesses ++}
hangman_word.innerHTML = hangman_word_updated
    console.log(num_incorrect_guesses)
    hangman_image.innerHTML = `<a><img id="hangman_image_1" src="../images/hangman_${num_incorrect_guesses}.png" alt="hangman"></a>`
}

if(num_incorrect_guesses >= 6){}











