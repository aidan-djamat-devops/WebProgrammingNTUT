// =========================================================
// script.js - JavaScript for the whole site
// Feature 1: Budget calculator (index.html)
// Feature 2: Neighborhood quiz (quiz.html)
// =========================================================


// ----- SETTINGS -----
// Exchange rate: how many New Taiwan Dollars (NTD) you get for 1 euro.
// Update this number when the exchange rate changes.
const EUR_TO_NTD = 35;


// =========================================================
// FEATURE 1: BUDGET CALCULATOR
// Runs when the "Calculate" button on index.html is clicked
// =========================================================
function calculateBudget() {
  // Read the numbers from the 4 input fields.
  // .value gives text, Number() turns that text into a number.
  let rent = Number(document.getElementById("rent").value);
  let food = Number(document.getElementById("food").value);
  let transport = Number(document.getElementById("transport").value);
  let phone = Number(document.getElementById("phone").value);

  // The box where we will show the answer
  let resultBox = document.getElementById("budget-result");

  // Make the result box visible (the CSS class "show" sets display: block)
  resultBox.classList.add("show");

  // Stop if someone typed a negative number
  if (rent < 0 || food < 0 || transport < 0 || phone < 0) {
    resultBox.innerHTML = "<p class='error'>Please only use positive numbers.</p>";
    return;
  }

  // Add everything up and convert to NTD
  let totalEur = rent + food + transport + phone;
  let totalNtd = Math.round(totalEur * EUR_TO_NTD);

  // Ternary operator: pick a message depending on the total
  let tip = totalEur <= 900
    ? "That is a comfortable student budget for Taipei."
    : "That is on the expensive side. Check the Food page for cheap eats!";

  // Put the result on the page
  resultBox.innerHTML =
    "<p>Monthly total: <strong>€" + totalEur + "</strong></p>" +
    "<p>In Taiwan dollars: <strong>NT$" + totalNtd + "</strong></p>" +
    "<p>" + tip + "</p>";
}


// =========================================================
// FEATURE 2: NEIGHBORHOOD QUIZ
// =========================================================

// The correct answer for each question, in order (question 1 is "b", etc.)
const correctAnswers = ["b", "c", "a", "b", "a"];

// The text of each correct answer, shown when someone picks the wrong one
const answerTexts = [
  "Longshan Temple",
  "Wanhua",
  "The blue line",
  "A 7-Eleven",
  "A foot massage on the massage street"
];

// "Check my answers" button
function checkQuiz() {
  let score = 0;

  // Go through the questions one by one. i starts at 0 because arrays start at 0.
  for (let i = 0; i < correctAnswers.length; i++) {
    let number = i + 1; // question numbers in the HTML start at 1

    // Find the radio button that is checked in this question.
    // If nothing is checked, querySelector gives back null.
    let selected = document.querySelector("input[name='q" + number + "']:checked");

    let questionBox = document.getElementById("question" + number);
    let feedback = document.getElementById("feedback" + number);

    // Remove the colors from a previous check
    questionBox.classList.remove("correct");
    questionBox.classList.remove("wrong");

    if (selected !== null && selected.value === correctAnswers[i]) {
      // Right answer: add 1 point and color the card green
      score++;
      questionBox.classList.add("correct");
      feedback.innerHTML = "Correct!";
    } else {
      // Wrong or no answer: color the card red and show the right answer
      questionBox.classList.add("wrong");
      feedback.innerHTML = "The right answer is: " + answerTexts[i];
    }
  }

  // Ternary operator: pick a message depending on the score
  let message = score === correctAnswers.length
    ? "Perfect! You are ready to explore Wanhua."
    : "Read the My Neighborhood page and try again!";

  // Show the score
  let resultBox = document.getElementById("quiz-result");
  resultBox.innerHTML =
    "<p>You got <strong>" + score + " / " + correctAnswers.length + "</strong> right.</p>" +
    "<p>" + message + "</p>";
  resultBox.classList.add("show");
}

// "Try again" button: clear everything so the quiz starts fresh
function resetQuiz() {
  // Uncheck every radio button on the page
  let radios = document.querySelectorAll("input[type='radio']");
  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }

  // Remove the colors and feedback text from every question
  for (let i = 0; i < correctAnswers.length; i++) {
    let number = i + 1;
    document.getElementById("question" + number).classList.remove("correct");
    document.getElementById("question" + number).classList.remove("wrong");
    document.getElementById("feedback" + number).innerHTML = "";
  }

  // Hide the score box again
  document.getElementById("quiz-result").classList.remove("show");
}
