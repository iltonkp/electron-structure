document.body.addEventListener("click", event => {
  if (event.target.dataset.section) {
    loadNewSection(event);
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
