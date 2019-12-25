const GameService = require("../services/games-services");
var games = [];
var selectedNumbers = [];
var button;

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
