// test correct importation jquery
//console.log($);
// test if app.js can access questions.js
//console.log(testQuestion);

// we are going to define a couple initial value
let counter = 10;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

//3.b  if timer reach 0, we need to have a next question!
function nextQuestion() {
    const isQuestionOver = (testQuestion.length - 1) === currentQuestion;
    if (isQuestionOver) {
        displayResult();
        console.log("Game is over");
    } else {
        currentQuestion++;
        loadQuestion();
    }
}

// 3. How to start a 30 second timer for user  to choose an answer
// for each question?
// countDown  / timeUp / 3.b / 3.c
function timeUp() {
    clearInterval(timer);
    // the user has lost
    lost++;
    // timeUP behavior
    preLoadImage("lost")
    setTimeout(nextQuestion, 3 * 1000);
}


function countDown() {
    // deincrement
    counter--;
    // jquery
    $("#time").html(`Timer: ${counter}`)
    // non-negvalue
    if (counter === 0) {
        timeUp();
    }
}



// 1. How to display the question and the choices to the browser?
// single responsability
// main logic 
function loadQuestion() {
    // getting the questions
    const question = testQuestion[currentQuestion].question;
    // getting the choices
    const choices = testQuestion[currentQuestion].choices;
    // getting the timer right:
    // counter must always be to 30
    counter = 10;
    //set the interval properly
    timer = setInterval(countDown, 1000);

    // jquery magic
    $('#time').html(`Timer: ${counter}`);
    $('#game').html(`<h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);

}


// 2. How to take care of the choices dynamically?
// single responsability
// we must call that function below above to access the constant
function loadChoices(choices) {
    let result = "";
    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}


// 3.c Correct/Wrong choice selected, go to the next question 
// lets make the click event is working
// // Event delegation situation because the .choices where
// added dynamically:
/*
$('.choice').on('click',function(){
    const selectedAnswer = $(this).attr('data-answer');
    console.log(selectedAnswer);
});
*/ // that won't work

$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = testQuestion[currentQuestion].correctAnswer;
    if (selectedAnswer === correctAnswer) {
        score++;
        preLoadImage("win")
        setTimeout(nextQuestion, 3 * 1000);
        console.log("win");
    } else {
        lost++;
        preLoadImage("lost")
        setTimeout(nextQuestion, 3 * 1000);
        console.log("lost");
    }
    console.log(selectedAnswer);
});


// 4. How to Display the results? / 4.1 reset button
function displayResult() {
    const result = `
    <p> You get ${score} question(s) right! </p>
    <p> You missed ${lost} question(s) right! </p>
    <p> Total Questions ${testQuestion.length} </p>
    <button class="btn btn-primary" id="reset"> Reset Game </button>
    `;
    $('#game').html(result);
}

// 4.1 Reset the game
$(document).on('click', "#reset", function () {
    counter = 10;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    // the answer is
    // //loadQuestion();
    // .. But
    // my idea !!!!!
    $("#start").show();
    $('#reset').hide();
    console.log("The game is reset!")
});

// 5 How to expose the remaining Questions?
// load it 
function loadRemainingQuestion() {
    const remainingQuestion = testQuestion.length - (currentQuestion + 1);
    const totalQuestion = testQuestion.length;
    return `Remaining Question: ${remainingQuestion} / ${totalQuestion}`;
}

// 6.1 Pick the images randomly
function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}

// 6. How to Display a funny giphy for correct or wrong answers
// i downloade images from giphy website on images directory
// Questions.js get these images inside an array
// status: win or lost
function preLoadImage(status) {
    const correctAnswer = testQuestion[currentQuestion].correctAnswer;
    if (status === 'win') {
        $('#game').html(`
            <p class="preload-image">Congrats you pick the correct answer</p>
            <p class="preload-image">The correct answer is: <b>${correctAnswer}</b></p>
            <img src="${randomImage(funImages)}"/>
            `);
    } else {
        $('#game').html(`
            <p class="preload-image">You pick the wrong answer</p>
            <p class="preload-image">The correct answer was: <b>${correctAnswer}</b></p>
            <img src="${randomImage(sadImages)}"/>
        `);
    }
}



//7. Start the Game Properly
$('#start').click(function () {
    console.log("start");
    // answer
    /*
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
    */
    $('#start').hide();
    $('#time').html(counter);
    loadQuestion();
});