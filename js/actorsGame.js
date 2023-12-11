//Give a random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Actors game
async function actorsGame() {
  //Fetch and give the initial data
  const response = await fetch("json/actors.json");
  const data = await response.json();

  //Give the choices
  choicesName = [];
  choicesNumber = [];

  let duplicate = false;

  for (let i = 0; i < 4; i++) {
    list = getRandomInt(0, 149);

    names = data.results[list].name;

    if (choicesName.includes(names)) {
      duplicate = true;
    }

    choicesName.push(names);
    choicesNumber.push(list);

    if (duplicate) {
      console.log(choicesName[choicesName.length + 1]);
      choicesName.pop();
      i -= 1;
      duplicate = false;
    }
  }

  //Store the answer
  answerId = choicesNumber[0];
  answerName = choicesName[0];

  //Display the image
  document.getElementById("movieImg").src =
    "https://image.tmdb.org/t/p/original/" +
    data.results[answerId].profile_path;

  //Randomize the answers
  choicesName = choicesName.sort(() => Math.random() - 0.5);

  buttons = document.getElementsByClassName("btn");
  //Make the choice buttons enabled
  buttons.disabled = false;

  //Assign choices to the buttons
  buttons[0].textContent = choicesName[0];
  buttons[1].textContent = choicesName[1];
  buttons[2].textContent = choicesName[2];
  buttons[3].textContent = choicesName[3];

  //Change the buttons list to an array
  const btnArr = Array.from(buttons);

  hearts = document.getElementsByClassName("hearts");
  //Change the hearts list to an array
  const heartsArr = Array.from(hearts);

  nextBTN = document.getElementById("nextActorBtn");
  actorsBTN = document.getElementById("actorsBtn");

  scoreText = document.getElementById("score");

  //Start the game
  actorsBTN.style.display = "none";
  moviesBtn.style.display = "none";
  scoreText.style.display = "block";
  document.getElementById("movieImg").style.display = "block";
  document.getElementById("text").style.display = "none";
  document.getElementById("homeSVG").style.display = "none";
  heartsArr.forEach((heart) => {
    heart.style.display = "block";
  });

  //Manage the anwsers
  btnArr.forEach((button) => {
    button.style.display = "inline-block";

    button.addEventListener("click", function () {
      if (button.textContent === answerName) {
        button.style.backgroundColor = "#13aa52";
        button.style.color = "#fff";

        addScore = true;
      } else {
        button.style.backgroundColor = "red";
        button.style.color = "#fff";

        lastHeart = heartsArr.length - 1;
        heartsArr[lastHeart].remove();

        addScore = false;
      }

      //Show the next button
      nextBTN.style.display = "block";

      //Disable the buttons after an answer
      const parentElement = button.parentElement;
      button.disabled = true;
      const siblings = Array.from(parentElement.children).filter(
        (child) => child !== button
      );
      siblings.forEach((sibling) => {
        sibling.disabled = true;

        if (sibling.textContent === answerName) {
          sibling.style.backgroundColor = "#13aa52";
          sibling.style.color = "#fff";
        }
      });
    });
  });

  //Manage the score
  if (addScore) {
    score += 1;
    document.getElementById("score").textContent = "Score: " + score;
    addScore = false;
  }

  //Reset the buttons for the next question
  nextBTN.addEventListener("click", function () {
    btnArr.forEach((button) => {
      button.style.backgroundColor = "";
      button.disabled = false;
      button.style.color = "#000";
    });

    nextBTN.style.display = "none";
  });

  //Manage the restart button
  restartBTN = document.getElementById("restartBtn");
  restartBTN.addEventListener("click", function () {
    location.reload();
  });

  //Manage the loosing state
  loseText = document.getElementById("loseText");
  if (heartsArr.length === 0) {
    loseText.style.display = "block";
    document.getElementById("movieImg").style.display = "none";
    btnArr.forEach((button) => {
      button.style.display = "none";
    });
    restartBTN.style.display = "block";
  }
}
