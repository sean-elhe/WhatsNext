let globalData = null;
let bookName = "Genesis";
let bookNameDisplay = "Genesis"
let currentIndex = 0;
let randomIndex = 0;
let rightCount = 0;
let wrongCount = 0;
let stage = 1;
let number = 0;

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
const score = document.getElementById("score")
const booksList = document.getElementById("booksList")


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        globalData = data

        number = Math.floor(Math.random() * 100);
        randomIndex = Math.floor(Math.random() * (globalData.length - 2)) + 1;
        displayQuestionRandom();

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

}

function displayQuestionReverse(){

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
    nextBtn.textContent = `[${rightCount} /
        ${rightCount + wrongCount}]`;
    currentIndex++;
    randomIndex = Math.floor(Math.random() * (globalData.length - 2)) + 1;
    number = Math.floor(Math.random() * 100);

}

function nextBook() {
    if (stage === 1) {
        checkAnswer();
        stage = 2
    } else {
        displayQuestionRandom();
        stage = 1
    }
};

document.getElementById("nextBtn").addEventListener('click', () => {
    nextBook();
});



// // async function checkAnswer(){
// //     let books = globalData;
// //     let bookName = books[currentIndex].book_name;
// //     let bookNameAlt = books[currentIndex].book_name;

// //     let userText = answer.value;


// //     if (stage === 1) {
// //         console.log(stage)
// //             if (userText === bookName) {
// //                 rightCount++
// //                 answer.classList.add("correct")
// //             } else {
// //                 wrongCount++
// //                 answer.classList.add("wrong")
// //             }
// //         answer.value = bookName;

// //         stage = 2
// //         nextBtn.textContent = "Next";
// //         currentIndex++

// //     } else {
// //         console.log(stage)
// //         answer.value = "";
// //         question.textContent =
// //         "What's after " + bookNameAlt + "?"

// //         stage = 1
// //         nextBtn.textContent = "Check"

// //     }


    
// //     console.log(`${rightCount}/${wrongCount} `)
// //     // console.log(userText)
// //     // console.log(bookName)
// // }
