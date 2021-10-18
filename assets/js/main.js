//   _____      ______      __       ____       ____       _
// ||     \\   | _____|    //\\     | ___\\   / ____|    // \\
// ||      \\  ||__       //  \\    ||    || | |___    / /   \ \
// ||       || | __|     //____\\   ||___//   \ ____\ | |     | |
// ||      //  ||_____  //      \\  || \\     _____ || \ \   / /
// ||_____//   |______|//        \\ ||   \\  |_____ /    \\_//

// Author: DearSO
// GitHub: https://github.com/soph-k
// Description: Sophk_Fun_Quiz



///////////////////////////////// Selectors ////////////////////////////
// Welcome 
const welcomeContainer = $(".welcome_container");
const startButtonEl = $(".start_btn")

// Quiz Started 
const quizStartedContainer = $(".started_container");
const infoContainer = $(".info_container");
const timerEl = $(".timer");
const scoreboardEl = $(".score");
const counterEl = $(".counter");

// Quiz Selector
var questionEl = $(".question");
const answerContainer = $(".answer_container");
const answerEl = Array.from($(".answer_button"));

// Scoreboard Container
const scoreboardContainer = $(".scoreboard_container");
const finalTimeEl = $(".final_time");
const finalCounterEl = $(".final_counter");
const finalScoreEl = $(".final_score");
const submitBtn = $(".submit_btn");
const inputInitalEl = $("#enter_initals");
// const initalValue = inputInitalEl.val();
// const scoreValue = finalScoreEl.val();
// const finalScoreStorage = localStorage.getItem("highScoresStorage");
const highScoreStorage = JSON.parse(localStorage.getItem("highScores")) || [];
const displayHighScore = $(".highscore_output")
// const addScore = { scores: lastScore, name: username.value };
const restartButtonEl = $(".restart_btn");




// Global Variables
let score = 0;
let counter = 1;
let timeRemaining = 80;


// Question Array
const questions = [
  { 
    question: "What is the most common first name in the world?",
    option1: "Peter",
    option2: "Sarah",
    option3: "Lee",
    option4: "Mohammed",
    option5: "Mary",
    answer: 4,
  },
  { 
    question: "What is the largest organ for humans",
    option1: "Heart",
    option2: "Liver",
    option3: "Skin",
    option4: "Lungs",
    option5: "Small Intestine",
    answer: 3,
  },
  { 
    question: "What is the capital of Turkey?",
    option1: "Moscow",
    option2: "Kabul",
    option3: "Ottawa",
    option4: "Damascus",
    option5: "Ankara",
    answer: 5,
  },
  {
    question: "What is the earth’s circumference?",
    option1: "10,000 miles",
    option2: "20,000 miles",
    option3: "15,000 miles",
    option4: "25,000 miles",
    option5: "30,000 miles",
    answer: 4,
  },
  {
    question: "How many hearts do Octopuses have?",
    option1: "1 heart",
    option2: "2 hearts",
    option3: "3 hearts",
    option4: "4 hearts",
    option5: "5 hearts",
    answer: 3,
  },
];

// Question Variables
var questionArray = []; 
let currentQuestion;
let nextQuestion = false;
let questionIndex = 0;


///////////////////////////////// Functions ////////////////////////////
// Start Quiz Function, after start button is pressed
function startQuiz () {
  score = 0;
  counter = 0;
  timeRemaining = 80;
  quizStartedContainer.removeClass('hidden');
  welcomeContainer.addClass('hidden');
  scoreboardContainer.addClass('hidden')
  generateQuestions ();
  startTimer ();
  startScoreBoard (); 
}


// Start Quiz Function, after start button is pressed
function generateQuestions () {
  startCounter ();
  if(counter >= 6) {
    clearInterval(counter);
    displayScoreBoard ();
  }
  else {
    questionArray = [...questions];
    const shuffledQuestions = Math.floor(Math.random() * questionArray.length);
    currentQuestion = questionArray[shuffledQuestions];
    questionEl.text(currentQuestion.question);
    answerEl.forEach(option => {
      const answerNumber = option.dataset['number'];
      option.innerText = currentQuestion['option'+ answerNumber];
    });
    questions.splice(shuffledQuestions, 1)
    answerEl.forEach(choosenAnswer => choosenAnswer.removeAttribute('disabled', false));
}
}


function startScoreBoard () {
  scoreboardEl.text("Score: " + score);
}


// Start Quiz Function, after start button is pressed
function startTimer () {
  let timerInterval = setInterval(function () {
  timeRemaining--;
  timerEl.text("Timer: " + timeRemaining);
  if (timeRemaining <= 0) {
    timeRemaining = 0;
    clearInterval(timerInterval);
    displayScoreBoard();
  }}, 1500);
}


function startCounter () {
  counter++
  counterEl.text("Question: " + counter + "/" + 5);

}


function displayScoreBoard () {
  scoreboardContainer.removeClass('hidden');
  quizStartedContainer.addClass('hidden');
  const finalTime = 80 - timeRemaining; 
  
  finalScoreEl.text("Score: " + score);
  finalTimeEl.text("Time: " + finalTime);
  if (counter > 6) {
    counter = 5;
    finalCounterEl.text("Question: " + counter + "/" + 5);
  } 
}


function submitInitals (event) {
  event.preventDefault ();
  if (inputInitalEl.val() === "") {
    submitBtn.disabled = true;
  }
  else {
    submitBtn.disabled = false;
    submitBtn.click(saveHighScore);
  }
}


function clearResults () {
  location.reload();                                                                       //
  generateQuestions ();                                                                    // Start Quiz Function, after start button is pressed
}


function saveHighScore (event) {
  event.preventDefault ();
  const highScoreArray = {
    name: inputInitalEl.val(),
    score: savedScore,
  }
  highScoreStorage.push(highScoreArray);
  highScoreStorage.sort(function (a, b) {
    return b.score - a.score
  })
  highScoreStorage.splice(5);
  localStorage.setItem("highScoresStorage", JSON.stringify(highScoreStorage));
  console.log(highScoreStorage);
  retriveHighScore ();
}


function retriveHighScore () {
  highScoreStorage.map(function(highScoreStorage){
    return displayHighScore.text( highScoreStorage.name - highScoreStorage.scoreValue)
  })
}


function localStorageLoop () {
  while(localStorage.length < 5) {
    const initalValue = localStorage.initalValue(i);
    const scoreValue = localStorage.getItem(initalValue);
    highScoreEl.innerText += `${initalValue}: ${scoreValue}`;
  }
}


// Evernt Listeners
startButtonEl.click(startQuiz);


answerEl.forEach(function (option) {
  option.addEventListener('click', event => {
    const choosenOption = event.target;
    const choosenAnswer = choosenOption.dataset['number'];
    answerEl.forEach(choosenAnswer => choosenAnswer.setAttribute('disabled', true));
      if(choosenAnswer == currentQuestion.answer) {
        choosenOption.parentElement.classList.add('correct');
        startScoreBoard (score += 15);  
      }
      else {
        choosenOption.parentElement.classList.add('incorrect');
        startTimer (timeRemaining -= 15);
      }
      setTimeout(() => {
        choosenOption.parentElement.classList.remove('correct');
        choosenOption.parentElement.classList.remove('incorrect');
        generateQuestions ();
      }, 1000);
  });
});


restartButtonEl.click(clearResults);

