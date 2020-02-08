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
        let bodyClass = document.querySelector(`#${sectionId} #bodyClass`);
        if(bodyClass) {
            document.getElementsByTagName("BODY")[0].className = "";
            document.getElementsByTagName("BODY")[0].className = bodyClass.value;
        }
    }

    _hideCurrentSection() {
        let sections = document.querySelectorAll(".template");
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

    loadModal() {
        document.getElementById("background-modal").classList.add("is-active");
        document.getElementById("modal-rules").classList.add("is-active");
    }

    closeModal() {
        document.getElementById("background-modal").classList.remove("is-active");
        document.getElementById("modal-rules").classList.remove("is-active");
    }
}