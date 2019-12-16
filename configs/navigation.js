const GameService = require("../services/games-services");

document.body.addEventListener("click", event => {
  if (event.target.dataset.section) {
    loadNewSection(event);
    if (event.target.dataset.section == "new-game") {
      loadGame();
    }
  }
});

function loadNewSection(event) {
  hideCurrentSection();
  const sections = document.querySelectorAll(".container");
  const sectionId = `${event.target.dataset.section}-section`;

  if (sectionId === "mega-sena-section") {
    Array.prototype.forEach.call(sections, section => {
      section.classList.remove("container-show");
    });
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
  let games = await gameService.getAllGames();

  let newGamePage = document.body.getElementsByClassName(
    "container-buttons-new-games"
  );
  let html = "";
  games.data.forEach(element => {
    html += `<button class="btn-game" id="${element.name.toLowerCase()}" type="button" data-section="${element.name.toLowerCase()}"></button>`;
  });

  newGamePage[0].innerHTML = html;
}
