const AbstractController = require("./abstractController.js");
const GameService = require("../services/games-services");

class BetController extends AbstractController {

    constructor(event) {
        super(event);
        this._games = [];
        this._gameService = new GameService();
        this._loadEvents();
    }

    _loadEvents() {
        this._ageConfimation();
        this._newGame();
        this._openGame();
        this._confirmGame();
        this._cancelBet();
        this._oneMoreBet();
        this._doCheckout();
        this._payNow();
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
            this._gameService.loadPageGame();
            this._openGame();
        });
    }

    _openGame() {
        this._addEvents(".btn-game", "click", event => {
            this._loadPage(event.target.dataset.section);
            this._gameService.startGame(event.currentTarget.attributes['gameselected'].value);
        });
    }

    _confirmGame() {
        this._addEvents("#confirmGame", "click", event => {
            let isEverythingOk = this._gameService.confirmGame();
            if(isEverythingOk) {
                this._loadPage("what-to-do");
            }
        })
    }

    _cancelBet() {
        this._addEvents("#cancelBet", "click", event => {
            this._loadPage("game-home");
        });
    }

    _oneMoreBet() {
        this._addEvents("#one-more-game", "click", event => {
            this._loadPage("new-game");
        });
    }

    _doCheckout() {
        this._addEvents("#do-checkout", "click", event => {
            this._loadPage("pay-now");
        });
    }

    _payNow() {
        this._addEvents("#pay-now-yes", "click", event => {
            this._loadPage("checkout");
            this._gameService.loadTableGame();
        })
    }

    _endCheckout() {
        this._addEvents("#end-checkout", "click", event => {
            this.loadPageGame("insert-card");
        })
    }
}

module.exports = new BetController(event);