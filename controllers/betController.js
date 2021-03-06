const AbstractController = require("./abstractController.js");
const GameService = require("../services/games-services");
const timeout = require('await-timeout');

class BetController extends AbstractController {

    constructor(event) {
        super(event);
        this._games = [];
        this._gameService = new GameService();
        this._loadEvents();
    }

    async _loadEvents() {
        this._ageConfimation();
        this._newGame();
        this._openGame();
        this._confirmGame();
        this._cancelBet();
        this._oneMoreBet();
        this._doCheckout();
        this._payNow();
        this._endCheckout();
        this._payNowNo();
        this._recordFileYes();
        this._goToCart();
        this._confirmEndCheckout();
    }

    _ageConfimation() {
        this._addEvents("#show-rules", "click", event => {
            this.loadModal();

            this._addEvents("#rules-agree", "click", event => {
                this._loadPage("game-home");
                this.closeModal();
            });

            this._addEvents("#rules-disagree", "click", event => {
                location.reload();
            });
        });

        this._addEvents("#go-back", "click", event => {
            location.reload();
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
            document.getElementById("background-modal").classList.add("is-active");
            document.getElementById("game-generic-modal").classList.add("is-active");

            this._addEvents("#game-modal-rules-agree", "click", event => {
                document.getElementById("background-modal").classList.remove("is-active");
                document.getElementById("game-generic-modal").classList.remove("is-active");
            })
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
            this.loadCart();
        })
    }

    loadCart() {
        this._loadPage("checkout");
        this._gameService.loadTableGame();
    }

    _endCheckout() {
        this._addEvents("#end-checkout", "click", event => {
            this._loadPage("confirm-checkout");
            this._confirmEndCheckout();

        })
    }

    _confirmEndCheckout() {
        this._addEvents("#confirm-end-checkout", "click", event => {
            this._loadPage("insert-card");
            
            timeout.set(3000)
                .then(() => {
                    this._loadPage("password");
                    document.getElementById("insert-password-input").focus();
                    this._addEvents("#insert-password-input", "keyup", event => {
                        if(event.key == "Enter") {
                            this._loadPage("remove-card");
                            timeout.set(4000)
                                .then(() => {
                                    this.doCheckout(event);
                                });
                        }
                    });
                });
        });

        this._addEvents("#noconfirm-end-checkout", "click", event => {
            this.loadCart();
        })
    }

    doCheckout(e) {
        e.preventDefault();
        this._gameService.doCheckout();
        this._loadPage("receipt-will-be-print");

        this._addEvents("#go-to-home", "click", event => {
            location.reload();
        });

        this._addEvents("#go-to-balance", "click", event => {
            alert("No implemented yet!");
        });

        this._addEvents("#exit-bet", "click", event => {
            this._loadPage("bet-sucess");

            timeout.set(4000)
                .then(() => {
                    location.reload();
                });
        });
    }

    _payNowNo() {
        this._addEvents("#pay-now-no", "click", event => {
            this._loadPage("record-file");
        });   
    }

    _recordFileYes() {
        this._addEvents("#record-file-yes", "click", event => {
            this._gameService.doCheckout(false);
            this._loadPage("remove-bill");
            timeout.set(4000)
                .then(() => {
                    this._loadPage("finalizate");
                })
        });
    }

    _goToCart() {
        this._addEvents("#go-to-cart", "click", event => {
            this.loadCart();
        })
    }
}

module.exports = new BetController(event);