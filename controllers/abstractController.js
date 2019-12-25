module.exports = class AbstractController {
    
    constructor(event) {
        this._event = event;
        this._hideCurrentSection();
        this._loadPage(null);
    }

    _loadPage(page) { 
        this._hideCurrentSection();
        let sectionId = "";
        if(page) {
            sectionId = `${page}-section`;
        } else {
            sectionId = `${this._event.target.dataset.section}-section`;
        }

        document.getElementById(sectionId).classList.add("is-show");
    }

    _hideCurrentSection() {
        let sections = document.querySelectorAll(".section");
        Array.prototype.forEach.call(sections, section => {
            section.classList.remove("is-show");
        });
    }

    _addEvents(selector, eventName, func) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener(eventName, event => {
                func(event);
            });
        });
    }
}