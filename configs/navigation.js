document.body.addEventListener('click', (event) => {
    if (event.target.dataset.section) {
        loadNewSection(event)
    }
})

function loadNewSection(event) {
    hideCurrentSection();

    const sectionId = `${event.target.dataset.section}-section`
    document.getElementById(sectionId).classList.add('is-show')
}

function hideCurrentSection() {
    const sections = document.querySelectorAll('.section')
    Array.prototype.forEach.call(sections, (section) => {
        section.classList.remove('is-show')
    })
}