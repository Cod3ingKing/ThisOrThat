
const option1Element = document.getElementById("option1");
const option2Element = document.getElementById("option2");
const leaderboardElement = document.getElementById("leaderboard");

const questions = [
  {
    option1: {
      text: "Coffee",
      image: "coffee.jpg",
      clickCount: 0,
    },
    option2: {
      text: "Tea",
      image: "tea.jpg",
      clickCount: 0,
    },
  },
  {
    option1: {
      text: "Beach",
      image: "beach.jpg",
      clickCount: 0,
    },
    option2: {
      text: "Mountains",
      image: "mountains.jpg",
      clickCount: 0,
    },
  },
];

let currentQuestionIndex = 0;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  option1Element.src = currentQuestion.option1.image;
  option2Element.src = currentQuestion.option2.image;
}

function selectOption(optionIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption =
    optionIndex === 0 ? currentQuestion.option1 : currentQuestion.option2;

  selectedOption.clickCount++;

  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
    showLeaderboard();
    
  }

  showQuestion();
}

function showLeaderboard() {
  leaderboardElement.innerHTML = "";
  const sortedOptions = getSortedOptions();

  sortedOptions.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("leaderboard-option");
    optionElement.innerHTML = `
      <img class="leaderboard-image" src="${option.image}">
      <div class="leaderboard-count">${option.clickCount} clicks</div>
    `;
    leaderboardElement.appendChild(optionElement);
  });
}

function getSortedOptions() {
  const allOptions = [];
  questions.forEach((question) => {
    allOptions.push(question.option1, question.option2);
  });

  return allOptions.sort((a, b) => b.clickCount - a.clickCount);
}

option1Element.addEventListener("click", () => selectOption(0));
option2Element.addEventListener("click", () => selectOption(1));

showQuestion();