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

async function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  try {
    const option1Response = await axios.get(
      "https://api.unsplash.com/photos/random?client_id=twzm8dJ0FB3-Gu6jvb6H1VJtbwDMw8DWGyYP7-dPK-I"
    );
    const option2Response = await axios.get(
      "https://api.unsplash.com/photos/random?client_id=twzm8dJ0FB3-Gu6jvb6H1VJtbwDMw8DWGyYP7-dPK-I"
    );

    const option1ImageUrl = option1Response.data.urls.regular;
    const option2ImageUrl = option2Response.data.urls.regular;

    // Update image source URLs
    questions[currentQuestionIndex].option1.image = option1ImageUrl;
    questions[currentQuestionIndex].option2.image = option2ImageUrl;

    // Update image elements in the DOM
    document.getElementById('option1').src = option1ImageUrl;
    document.getElementById('option2').src = option2ImageUrl;

    console.log("Option 1 Image URL:", option1ImageUrl);
    console.log("Option 2 Image URL:", option2ImageUrl);
  } catch (error) {
    console.error("Error retrieving images from Unsplash:", error);
  }
}

function selectOption(optionIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption =
    optionIndex === 0 ? currentQuestion.option1 : currentQuestion.option2;

  selectedOption.clickCount++;

  // Update image element with click count
  const selectedOptionElement = optionIndex === 0 ? document.getElementById('option1') : document.getElementById('option2');
  selectedOptionElement.nextSibling.innerHTML = `${selectedOption.clickCount} clicks`;

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

  // Display 3x4 grid of images in leaderboard
  for (let i = 0; i < 12; i++) {
    const option = sortedOptions[i];
    const optionElement = document.createElement("div");
    optionElement.classList.add("leaderboard-option");
    optionElement.innerHTML = `
      <img class="leaderboard-image" src="${option.image}">
      <div class="leaderboard-count">${option.clickCount} clicks</div>
    `;
    leaderboardElement.appendChild(optionElement);
  }
}


  function getSortedOptions() {
    const allOptions = [];
    questions.forEach((question) => {
      allOptions.push(question.option1, question.option2);
    });
  
    return allOptions.sort((a, b) => b.clickCount - a.clickCount);
  }

  showQuestion();
  
  // Add click event handlers to image elements
  document.getElementById('option1').addEventListener('click', function() {
      selectOption(0);
    });
    
    document.getElementById('option2').addEventListener('click', function() {
      selectOption(1);
    });
