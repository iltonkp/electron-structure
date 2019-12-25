module.exports = class AbstractController {
    
    constructor(event) {
        this._event = event;
        this._hideCurrentSection();
        this._loadPage();
    }

    _loadPage() { 
        let sectionId = `${this._event.target.dataset.section}-section`;
        document.getElementById(sectionId).classList.add("is-show");
    }

    _hideCurrentSection() {
        let sections = document.querySelectorAll(".section");
        Array.prototype.forEach.call(sections, section => {
            section.classList.remove("is-show");
        });
    }
}