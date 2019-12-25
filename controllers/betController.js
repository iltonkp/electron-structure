const AbstractController = require("./abstractController.js");
const GameService = require("../services/games-services");

class BetController extends AbstractController {

    constructor(event) {
        super(event);
        this._games = [];
        this._loadEvents();
        this._gameService = new GameService();
    }

    _loadEvents() {
        this._ageConfimation();
        this._newGame();
        this._openGame();
    }

    _ageConfimation() {
        this._addEvents(".age-confirmation", "click", event => {
            if(event.target) {
                this._loadPage(event.target.dataset.section);
            }
        });
    }

    _newGame() {
        this._addEvents("#new-game", "click", event => {
            this._loadPage(event.target.dataset.section);
        });
    }

    _openGame() {
        this._addEvents(".btn-game", "click", event => {
            this._loadPage(event.target.dataset.section);
            this._gameService.startGame(event.target.dataset.section);
        });
    }
}

module.exports = new BetController(event);