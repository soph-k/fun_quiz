const  startButtonEl = document.querySelector(".start_button");
const  welcomeEl = document.querySelector(".welcome");
const  infoContainer = document.querySelector("#info_container");
const  quizContainer = document.querySelector("#quiz_container");
var answerButtonEl = document.querySelectorAll(".answer_button");
let timerEl = document.querySelector(".timer");
let scoreboardEl = document.querySelector(".scoreboard");
let counterEl = document.querySelector(".counter");
const  questionEl = document.querySelector(".question");
// const  correctEl = document.querySelector(".correct");
// const  incorrectEl = document.querySelector(".incorrect");

var counter = 0
var score = 0;
var availableQuestions = [];
var secondsLeft = 80;

var questions = [
  { 
    question: "What is the most common first name in the world?",
    option1: "Peter",
    option2: "Sarah",
    option3: "Lee",
    option4: "Mohammed",
    option5: "Mary",
    answer: 4
  },
  { 
    question: "What is the largest organ for humans",
    option1: "Heart",
    option2: "Liver",
    option3: "Skin",
    option4: "Lungs",
    option5: "Small Intestine",
    answer: 3
  },
  { 
    question: "What is the capital of Turkey?",
    option1: "Moscow",
    option2: "Kabul",
    option3: "Ottawa",
    option4: "Damascus",
    option5: "Ankara",
    answer: "Ankara"
  },
  {
    question: "What is the earth’s circumference?",
    option1: "10,000 miles",
    option2: "20,000 miles",
    option3: "15,000 miles",
    option4: "25,000 miles",
    option5: "30,000 miles",
    answer: "25,000 miles"
  },
  {
    question: "How many hearts do Octopuses have?",
    option1: "1 heart",
    option2: "2 hearts",
    option3: "3 hearts",
    option4: "4 hearts",
    option5: "5 hearts",
    answer: "3 hearts"
  },
];


function startQuiz () {
  // if (availableQuestions.length === 0) {
  //   return window.localStorage
  // }
  startButtonEl.classList.add('hidden');
  welcomeEl.classList.add('hidden');
  infoContainer.classList.remove('hidden');
  quizContainer.classList.remove('hidden');
  counter = 0
  score = 0;
  generateQuestions ();
  startTimer ();
  // displayScoreBoard ();
}

function generateQuestions () {
  // if(question.length === 0)
  // return window.location.assign("highscore.html")

  counter++;
  counterEl.innerText = "Question: " + counter + "/" + 5;
  var questionIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[questionIndex];
  questionEl.innerText = currentQuestion.question;

  // if (currentQuestion == questions.length) {
  //   // return displayScoreBoard ();
  // }

  answerButtonEl.forEach(option => {
    const optionNumber = option.dataset["number"];
    option.innerText = currentQuestion["option" + optionNumber];
  });
  questions.splice(questionIndex, 1);
}

answerButtonEl.forEach(option => {
  option.addEventListener("click", event => {
    var userOption = event.target;
    var selectedOption = userOption.dataset["number"];
    // if(selectedOption === questions.answer) {
    //    true;
    // }
    // else {
    //   false;
    // }
    // var typeClass = 'incorrect'
    //   if(selectedOption == questions.answer) {
    //     typeClass = 'correct';
    //   }

    var classType = selectedOption === questions.answer ? 'correct' : 'incorrect';
  
    selectedOption.classList.add(classType);

    incrementScore = () => {
      if (selectedOption === questions.answer) {
        score += 20;
      }
      else {
        timeLeft -= 15
      }
      scoreboardEl.textContent = "Score: " + score;
    }
      
    setTimeout (() => {
    selectedOption.classList.remove(classType);
    generateQuestions ();
    }, 1000);
  });
});

function startTimer () {
  var timerInterval = setInterval(function () {
  secondsLeft--;
  timerEl.textContent = "Timer: " + secondsLeft;
  if (secondsLeft === 0) {
    clearInterval(timerInterval);
    alert("You Are Out of Time!");
    // displayScoreBoard();
  }
  }, 1000);
}






startButtonEl.addEventListener('click', startQuiz)





