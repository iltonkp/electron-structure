class BetController {

    constructor(event) {
        debugger;
        this._event = event;
        this._loadPage();
    }

    _loadPage() {
        let sectionId = `${this._event.target.dataset.section}-section`;
        document.getElementById(sectionId).classList.add("is-show");
    }
}

module.exports = new BetController(event);