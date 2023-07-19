// constant names
var startquiz = document.querySelector("#startquizEl");
var finishquiz = document.querySelector("#finishquizEl");
var timer = document.querySelector("#time");
var optionsEl = document.getElementById("options");
var nextbutton = document.querySelector(".nextbutton");
var submitBtn = document.querySelector("#submit-btn");
var questionEl = document.querySelector("#question");
var quizScore = document.getElementById("currentscore");
var finalScore = document.querySelector("finalScore");
var resultsEl = document.querySelector(".result");
var incorrectResult = document.querySelector(".wrong-message");
var timeRemaining = 180;
var questionindex = 0;
var score = 0;

function letsBegin() {
  // start function needs to do the following
  // start timer
  // hide start button
  // display question (make this its own function)
  startquiz.style.display = "none";
  timer.textContent = timeRemaining;
  var countDown = setInterval(function () {
    timeRemaining--;
    timer.textContent = timeRemaining;

    if (timeRemaining <= 0 || questionindex === questionBank.length) {
      clearInterval(countDown);
      timer.textContent = timer.textContent - 1;
      endgame();
    }
    console.log(timeRemaining);
    console.log("clock");
  }, 1000);
  if (timer.textContent <= 30) {
    document.querySelector("#timer").style.backgroundColor = "#F47174";
  }
  screenQuestions();
}

// Questions provided to User, array format
var questionBank = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<js>", "<scripting>"],
    answer: "<script>",
  },
  {
    question: "How to write an IF statement in Javascript?",
    options: ["if i=5", "if i==5 then", "if i=5 then", "if (i==5)"],
    answer: "if (i==5)",
  },
  {
    question: "How does a FOR loop start?",
    options: ["for (i <= 5; i++)", "for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5"],
    answer: "for (i = 0; i <= 5; i++)",
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["*", ",", "-", "="],
    answer: "=",
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function = myFunction()", "function myfunction()", "function ==myFunction()", "function: myFunction()"],
    answer: "function = myFunction()",
  },
];

// Start quiz function
startquiz.addEventListener("click", function () {
  letsBegin();
});

function screenQuestions() {
  //stop is there is no question
  if (questionindex >= questionBank.length) {
    return; //stop because there is no more questions to make appear on the screen
  }

  optionsEl.innerHTML = "";
  //   questions to appear
  questionEl.innerHTML = questionBank[questionindex].question;

  for (var i = 0; i < questionBank[questionindex].options.length; i++) {
    var onlyanswerEl = document.createElement("button");
    onlyanswerEl.setAttribute("id", `q${i}`);
    onlyanswerEl.textContent = questionBank[questionindex].options[i];
    onlyanswerEl.addEventListener("click", click);
    optionsEl.appendChild(onlyanswerEl);
  }
}

function click(event) {
  console.log(event.target.textContent);
  // create a function that will check if the answer is wrong and deduct time
  // needs to go to the next question in the array
  // if no more questions or time is up we will need to run a game over function else call thew question function again

  //return if we have answerd all questions and then endthe game
  if (questionindex >= questionBank.length) {
    return endgame();
  }

  //correct submission, go to next question
  if (questionBank[questionindex].answer === event.target.textContent) {
    document.querySelector(".correct-message").classList.remove("hide");
    setTimeout(function () {
      questionindex++; //point to next question
      document.querySelector(".correct-message").classList.add("hide");
      screenQuestions();
    }, 3000);
  } else {
    //for wrong submission deduct 10 seconds and go to next question
    timeRemaining -= 10;
    document.querySelector(".wrong-message").classList.remove("hide");
    setTimeout(function () {
      questionindex++; //point to next question
      document.querySelector(".wrong-message").classList.add("hide");
      screenQuestions();
    }, 3000);
  }
}

function endgame() {
  console.log("endgame");
  var initalsArea = document.querySelector(".results");
  initalsArea.classList.remove("hide");
  questionEl.classList.add("hide");
  optionsEl.classList.add("hide");


  submitBtn.addEventListener("click", saveScoreWithInitials);
}

function saveScoreWithInitials(event) {
  console.log("saveScoresWithInitial ̰");
  event.preventDefault();

  const initialsInput = document.getElementById("initialArea");
  const userInitials = initialsInput.value;
  const userScore = timeRemaining;
  const scoreObj = {
    initials: userInitials,
    score: userScore,
  };

  let allScores = JSON.parse(localStorage.getItem("scores")) || [];
  allScores.push(scoreObj);
  localStorage.setItem("scores", JSON.stringify(allScores));

  viewAllScores(allScores);
}

function viewAllScores(allScores) {
  console.log("viewAllScores");
  const scoresText = allScores.map((score) => `<li>${score.initials}: ${score.score}</li>`).join("");

  //wrap scores inside a ul and append to the screen somewhere
  const wrappedScores = `<ul>${scoresText}</ul`;

  //append or insert into the .result
  document.querySelector(".result").innerHTML = wrappedScores;
}


function completedQuiz() {
  console.log("completedQuiz");
  //Functions to  user initial and Save Score
  displayUserScore();
  saveUserScore();
}




