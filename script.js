

const questionElement = document.getElementById("question");
const option1Element = document.getElementById("option1");
const option2Element = document.getElementById("option2");

const questions = [
  {
    //question: "Which do you prefer, coffee or tea?",
    option1: {
      text: "Coffee",
      image: "coffee.jpg"
    },
    option2: {
      text: "Tea",
      image: "tea.jpg"
    }
  },
  {
    //question: "Which do you prefer, beach or mountains?",
    option1: {
      text: "Beach",
      image: "beach.jpg"
    },
    option2: {
      text: "Mountains",
      image: "mountains.jpg"
    }
  }
];

let currentQuestionIndex = 0;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  //questionElement.innerText = currentQuestion.question;
  option1Element.src = currentQuestion.option1.image;
  option2Element.src = currentQuestion.option2.image;
}

function selectOption(optionIndex) {
  // Do something with the selected option
  console.log(`Option ${optionIndex + 1} selected!`);

  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    // If we've reached the end of the questions, start over
    currentQuestionIndex = 0;
  }

  // Show the next question
  showQuestion();
}

// Add click event listeners to the option boxes
option1Element.addEventListener("click", () => selectOption(0));
option2Element.addEventListener("click", () => selectOption(1));

// Show the first question
showQuestion();