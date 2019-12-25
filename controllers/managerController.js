const fs = require('fs');
const pathRoot = require('../root');
const controllersFolder = `${pathRoot}/controllers`;

class ManagerController {

    constructor() {
        this._session = null;
        //will be a hashmap
        this._controllers = {};
        this._load();
    }

    _load() {
        this._getAllControllers();
        this._addEvents();
    }

    _getAllControllers() {
         fs.readdirSync(controllersFolder).forEach(file => {
            let index = file.replace(".js", "");
            this._controllers[index] = `${controllersFolder}/${file}`;
         });
    }

    _addEvents() {
        let buttonsHome = document.querySelectorAll(".home-button");
        buttonsHome.forEach(button => {
            button.addEventListener("click", event => {
             this._loadController(event);
            });
        });
    }

    _loadController(event) {
        this._hideCurrentSection();
        delete require.cache[this._controllers[event.target.getAttribute("controller")]];
        require(this._controllers[event.target.getAttribute("controller")]);
    }

    _hideCurrentSection() {
        const sections = document.querySelectorAll(".section");
        Array.prototype.forEach.call(sections, section => {
          section.classList.remove("is-show");
        });
      }
}

module.exports = new ManagerController();