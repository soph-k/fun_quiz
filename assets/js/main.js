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
// Home Page Selectors
const  welcomeContainer = document.querySelector(".welcome");
const  startButtonEl = document.querySelector(".start_button");

// Info Container
const  infoContainer = document.querySelector("#info_container");
// Info Selector
const timerEl = document.querySelector(".timer");
const scoreboardEl = document.querySelector(".score");
const counterEl = document.querySelector(".counter");

// Quiz Container
const  quizContainer = document.querySelector("#quiz_container");
// Quiz Selector
const questionEl = document.querySelector(".question");
const answerContainer = document.querySelector(".answer_container");
const answerEl = Array.from(document.getElementsByClassName("answer_button"));
const  correctEl = document.querySelector(".correct");
const  incorrectEl = document.querySelector(".incorrect");

// Scoreboard Container
const scoreboardContainer = document.querySelector("#scoreboard_container");
const restartButtonEl = document.querySelector(".restart_button");
// const enterInitalEl = document.querySelector();
// const saveButtonEl = document.querySelector();
// const finalScoreEl = document.querySelector("")
// const finalScoreStorage = localStorage.getItem("finalScoreStorage");
// const highScoresEl = JSON.parse(localStorage.getItem("highScores")) || [];
// const addScore = { scores: lastScore, name: username.value };


// Global Variables
let score = 0;
let counter = 0
let timeRemaining = 80;


// Question Array
let questions = [
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

Question Variables 
const questionArray = [... questions];
const shuffledQuestions = Math.floor(Math.random() * questions.length);

const questionIndex = 0;
const currentQuestion = questionArray[shuffledQuestions];


///////////////////////////////// Functions ////////////////////////////
// Start Quiz Function, after start button is pressed
function startQuiz () {
  score = 0;
  counter = 0
  timeRemaining = 80;
  startButtonEl.classList.add('hidden');
  welcomeContainer.classList.add('hidden');
  infoContainer.classList.remove('hidden');
  quizContainer.classList.remove('hidden');
  scoreboardContainer.classList.add('hidden');
  generateQuestions ();
  startTimer ();
  startScoreBoard (); 
}


// function nextQuestion () {
//   generateQuestions(questions[questionIndex])
//   if(questions.length > questionIndex + 1) {
//     displayScoreBoard ();
//   }

// }


// Start Quiz Function, after start button is pressed
function generateQuestions (currentQuestion) {
  questionEl.innerText = currentQuestion.question;
  answerEl.forEach(option => {
    const answerNumber = option.dataset['number'];
    option.innerText = currentQuestion['option'+ answerNumber];
  });
  startCounter ();
}

// Start Quiz Function, after start button is pressed
function startTimer () {
  let timerInterval = setInterval(function () {
  timeRemaining--;
  timerEl.textContent = "Timer: " + timeRemaining;
  if (timeRemaining <= 0) {
    timeRemaining = 0;
    clearInterval(timerInterval);
    alert("You Are Out of Time!");
    displayScoreBoard();
  }
  }, 1000);
}


function startCounter() {
  counter ++
  if(counter === 6) {
    return displayScoreBoard ();
  }
  if (counter > 5) {
    counter = 0;
  counterEl.innerText = "Question: " + counter + "/" + 5;
}
}
  

function startScoreBoard () {
  score;
  scoreboardEl.textContent = "Score: " + score;
};


// Start Quiz Function, after start button is pressed
function displayScoreBoard () {
  scoreboardContainer.classList.remove('hidden')
  quizContainer.classList.add('hidden');
}

// function highScores (event) {
//   event.preventDefault ();

//   finalScoreEl.innerText = finalScoreStorage;

//   addScore;

//   highScoresEl.sort((a,b) => b.score - a.score)
//   highScoresEl.splice(15);

//   localStorage.setItem("highScoresEl", JSON.stringify(highScoresEl));
// };



// Evernt Listeners
startButtonEl.addEventListener('click', startQuiz);

answerEl.forEach(option => {
  option.addEventListener('click', event => {
    const choosenOption = event.target;
    const choosenAnswer = choosenOption.dataset['number'];

      if(choosenAnswer == currentQuestion.answer) {
        choosenOption.parentElement.classList.add('correct');
        startScoreBoard (score += 15);  
      }
      else {
        choosenOption.parentElement.classList.add('incorrect');
        startTimer (timeRemaining -= 15);
        if (timeRemaining < 0) {
          timeRemaining = 0;
          displayScoreBoard ();
        }
      }

      // currentQuestion++;
      // if (currentQuestion < questions.length) {
      //   generateQuestions ();
      // } else {
      //   displayScoreBoard ();
      // }

      setTimeout(() => {
        choosenOption.parentElement.classList.remove('correct');
        choosenOption.parentElement.classList.remove('incorrect');
        
        generateQuestions ();
      }, 1000);
  });
});


// enterInitalEl.addEventListener('keyup', () => { 
// })

restartButtonEl.addEventListener('click', startQuiz);

