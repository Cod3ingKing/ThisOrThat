const leaderboardElement = document.getElementById("leaderboard");
let currentQuestionIndex = 0;

let option1ImageUrl;
let option2ImageUrl;
let selectedOption;
let clickUp;

const questions = [];

function generateQuestion() {
  const newQuestion = {
    option1: {
      text: "Option 1",
      image: "option1.jpg",
      clickCount: 0,
    },
    option2: {
      text: "Option 2",
      image: "option2.jpg",
      clickCount: 0,
    },
  };
  questions.push(newQuestion);
}

// Call the generateQuestion function to add a new question to the array





// Generate a set of images from the Unsplash API

async function showQuestion() {
 
  const currentQuestion = questions[currentQuestionIndex];

  try {
   const option1Response = await axios.get(
      "https://api.unsplash.com/photos/random?client_id=twzm8dJ0FB3-Gu6jvb6H1VJtbwDMw8DWGyYP7-dPK-I"
    );
    const option2Response = await axios.get(
      "https://api.unsplash.com/photos/random?client_id=twzm8dJ0FB3-Gu6jvb6H1VJtbwDMw8DWGyYP7-dPK-I"
    );
//links to pics
    option1ImageUrl = option1Response.data.urls.regular;
    option2ImageUrl = option2Response.data.urls.regular;

    // Update image source URLs
    currentQuestion.option1.image = option1ImageUrl;
    currentQuestion.option2.image = option2ImageUrl;

    // Update image elements in the DOM
    document.getElementById('option1').src = option1ImageUrl;
    document.getElementById('option2').src = option2ImageUrl;
    
   
  } catch (error) {
    console.error("Error retrieving images from Unsplash:", error);
    
  }
  
}

function selectOption(optionIndex) {
  
  
  const currentQuestion = questions[currentQuestionIndex];
  selectedOption = optionIndex === 0 ? currentQuestion.option1.image = option1ImageUrl : currentQuestion.option2.image = option2ImageUrl ;

 clickUp = optionIndex === 0 ? currentQuestion.option1 : currentQuestion.option2;

 // const clickCountObj = questions.find((question) => question.option1 === clickUp || question.option2 === clickUp).clickUp;

    //stoped here above is new
  clickUp.clickCount++;

  // Update image element with click count
  //const selectedOptionElement = optionIndex === 0 ? document.getElementById('option1') : document.getElementById('option2');
  //selectedOptionElement.nextSibling.innerHTML = `${clickUp.clickCount} clicks`;

  console.log(option1ImageUrl);
  
 
    showLeaderboard();
    
    generateQuestion();
  showQuestion();
  
  
}

let imageCount = 0;

function createImageElement(imageUrl) {
  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  imageElement.id = `image-${imageCount}`;
  imageElement.classList = ("leaderboard-image");
  imageCount++;
  return imageElement;

  
};




function showLeaderboard() {
  
  
  const sortedOptions = getSortedOptions();
  const createImage = createImageElement(selectedOption);
 
  console.log(questions);

  // Display a grid of images in leaderboard, 4 per row
const ROW_LENGTH = 4;
for (let i = 0; i < sortedOptions.length; i += ROW_LENGTH) {
  
  //const rowOptions = sortedOptions.slice(i, i +  ROW_LENGTH);
  const rowElement = document.createElement("div");
  rowElement.classList.add("leaderboard-row");

    //const optionElement = document.createElement("div");
    //optionElement.classList.add("leaderboard-option");
    rowElement.innerHTML = `
           ${createImage.outerHTML}
      <div class="leaderboard-count">${clickUp.clickCount} <img id='heart' src="./heart.png"> </div> 
    `;
    //changed sortedOptions to rowOption
    //document.getElementById("leaderboard").appendChild(rowElement);
  currentQuestionIndex++;    
  return leaderboardElement.appendChild(rowElement);
  console.log(sortedOptions.length);
  
};

 

};


  function getSortedOptions() {
    const allOptions = [];
    questions.forEach((question) => {
      allOptions.push(question.option1, question.option2);
    });
  
  return allOptions.sort((a, b) => b.clickCount - a.clickCount);
    
  }
  console.log(questions);
  generateQuestion();
  showQuestion();
  
  // Add click event handlers to image elements
  document.getElementById('option1').addEventListener('click', function() {
      selectOption(0);
    });
    
    document.getElementById('option2').addEventListener('click', function() {
      selectOption(1);
    });

