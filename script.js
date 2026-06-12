let globalData = null;
let bookName = "Genesis";
let bookNameDisplay = "Genesis"
let currentIndex = 0;
let randomIndex = 0;
let rightCount = 0;
let wrongCount = 0;
let stage = 1;
let number = 0;
let mode = "Ordered"

const answer = document.getElementById("answer");

answer.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        nextBook();
    }
});

const question = document.getElementById("question")
const secondWord = document.getElementById("secondWord")
const thirdWord = document.getElementById("thirdWord")

const nextBtn = document.getElementById("nextBtn")
const scoreBtn = document.getElementById("scoreBtn")
const booksList = document.getElementById("booksList")

const modeBtn = document.getElementById("modeBtn")


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        globalData = data

        if (mode === "Ordered") {
            currentIndex = 1;
            displayQuestionOrdered();
        } else if (mode === "Reverse") {
            currentIndex = 1;
            displayQuestionReverse();
        } else {
            number = Math.floor(Math.random() * 100);
            randomIndex = Math.floor(Math.random() * (globalData.length - 2)) + 1;
            displayQuestionRandom();
        }

        booksList.innerHTML = "";

        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.book_name;
            booksList.appendChild(option);
        })
    });

function displayQuestionRandom() {
    const books = globalData;
    bookName = books[randomIndex].book_name;

    console.log("Stage:", stage)
    answer.classList.remove("correct", "wrong")
    answer.value = "";
    nextBtn.textContent = "Check"

    if (number > 50) {
        console.log("Number is over 50: What's after?")
        bookNameDisplay = books[randomIndex - 1].book_name;
        thirdWord.textContent = `${bookNameDisplay}?`;


        secondWord.classList.remove("wrong")
        secondWord.classList.add("correct")
        secondWord.textContent = "after"
    } else {
        console.log("Number is 50 or less: What's before?")
        bookNameDisplay = books[randomIndex + 1].book_name;
        thirdWord.textContent = `${bookNameDisplay}?`;
    
        secondWord.classList.remove("correct")
        secondWord.classList.add("wrong")
        secondWord.textContent = "before"
    }

    console.log("Current index: ", currentIndex)

}

function displayQuestionOrdered() {
    const books = globalData;
    bookName = books[currentIndex].book_name;

    console.log("Stage:", stage)
    secondWord.classList.add("correct")
    answer.value = "";
    nextBtn.textContent = "Check"

    bookNameDisplay = books[currentIndex - 1].book_name;
    thirdWord.textContent = `${bookNameDisplay}?`;
    secondWord.textContent = "after"


    console.log("Current index: ", currentIndex)
}

function displayQuestionReverse() {


    const books = globalData;
    bookName = books
        [(currentIndex - 3 + books.length) % books.length].book_name;

    console.log("Stage:", stage)
    answer.classList.remove("correct", "wrong")
    answer.value = "";
    secondWord.classList.add("wrong")
    nextBtn.textContent = "Check"

    bookNameDisplay = books
        [(currentIndex - 2 + books.length) % books.length].book_name;
    thirdWord.textContent = `${bookNameDisplay}?`;
    secondWord.textContent = "before"

    console.log("Current index: ", currentIndex)

}

function checkAnswer(){
    let userText = answer.value;

    if (userText.trim().toLowerCase()
         === bookName.toLowerCase()) {
        rightCount++
        answer.classList.add("correct")
    } else {
        wrongCount++
        answer.classList.add("wrong")
    }

    answer.value = bookName
    scoreBtn.textContent = `${rightCount}/
        ${rightCount + wrongCount}`;
    nextBtn.textContent = "Next"
    
    if (mode === "Ordered") {
        currentIndex++;
    } else if (mode === "Reverse") {
        currentIndex--;
    } else {
        randomIndex = Math.floor(Math.random() * (globalData.length - 2)) + 1;
        number = Math.floor(Math.random() * 100);
    }
}

function nextBook() {
    if (stage === 1) {
        checkAnswer();
        stage = 2
    } else {
        if (mode === "Ordered") {
            displayQuestionOrdered();
            stage = 1
        } else if (mode === "Reverse") {
            displayQuestionReverse();
            stage = 1
        } else {
            displayQuestionRandom();
            stage = 1
        }
    }
};

function resetScore() {
    currentIndex = 1;
    rightCount = 0;
    wrongCount = 0;
    number = Math.floor(Math.random() * 100);
    randomIndex = Math.floor(Math.random() * (globalData.length - 2)) + 1;
    answer.classList.remove("correct", "wrong")
    scoreBtn.textContent = "---"
}

document.getElementById("nextBtn").addEventListener('click', () => {
    nextBook();
});

document.getElementById("modeBtn").addEventListener("click", () => {
    if (mode === "Ordered") {
        mode = "Reverse"
        modeBtn.textContent = "Reverse"
        resetScore();
        displayQuestionReverse();
    } else if (mode === "Reverse") {
        mode = "Random"
        modeBtn.textContent = "Random"
        resetScore();
        displayQuestionRandom();
    } else {
        mode = "Ordered"
        modeBtn.textContent = "Ordered"
        resetScore();
        displayQuestionOrdered();
    }
})