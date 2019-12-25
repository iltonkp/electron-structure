const GameService = require("../services/games-services");
var games = [];
var selectedNumbers = [];
var button;

// document.body.addEventListener("click", event => {
//   if (event.target.dataset.section) {
//     loadNewSection(event);
//     if (event.target.dataset.section == "new-game") {
//       loadGame();
//     }
//   }
// });

function loadNewSection(event) {
  hideCurrentSection();
  const sections = document.querySelectorAll(".container");
  const sectionId = `${event.target.dataset.section}-section`;

  if (sectionId === "mega-sena-section") {
    Array.prototype.forEach.call(sections, section => {
      section.classList.remove("container-show");
    });
    openGame("mega-sena")
  } else {
    Array.prototype.forEach.call(sections, section => {
      section.classList.add("container-show");
    });
  }

  document.getElementById(sectionId).classList.add("is-show");
}

function hideCurrentSection() {
  const sections = document.querySelectorAll(".section");
  Array.prototype.forEach.call(sections, section => {
    section.classList.remove("is-show");
  });
}

async function loadGame() {
  let gameService = new GameService();
  games = await gameService.getAllGames();

  let newGamePage = document.body.getElementsByClassName(
    "container-buttons-new-games"
  );

  let html = "";
  games.data.forEach(element => {
    html += `<button class="btn-game" id="${element.name.toLowerCase()}" type="button" data-section="${element.name.toLowerCase()}"></button>`;
  });

  newGamePage[0].innerHTML = html;
}

async function openGame(selectGame) {
  let section = document.getElementById(`${selectGame}-new-game`);
  let game = null;
  
  games.data.forEach(g => {
    if(g.name.toLowerCase() == selectGame) {
      game = g; 
    }
  });

  let html = "";
  for(let i = 1; i <= game.numbersAmount; i++) {
    html += `<button type="button" class="btn-number">${i}</button>`
  }

  section.innerHTML = html;

  let buttonsNumbers = document.querySelectorAll(".btn-number");
  buttonsNumbers.forEach(b => {
    b.addEventListener("mouseup", event => {
      selectNumbers(event.target.firstChild.nodeValue);
      console.log(event.target.className);
      event.target.className += " active";
    });
  })
}

function selectNumbers(number) {
  selectedNumbers.push(number);
}
