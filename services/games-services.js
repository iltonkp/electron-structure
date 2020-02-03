const axios = require("../configs/api");

module.exports = class GameService {
    constructor() {
        this._minNumber = 0;
        this._maxNumber = 0;
        this._games = [];
        this._selectedNumbers = [];
        this._getAllGames();
        this._checkout = [];
        this._selectedGame = {};
    }

    async _getAllGames() {
        let res = await axios.get('game');
        return this._games = res.data;
    }

    loadPageGame() {
        let section = document.getElementById("games");
        let html = "";
        this._games.forEach(g => {
            let className = g.name.toLowerCase().replace("-","");
            html += `<li><button class="${className} btn-game" type="button" gameselected=${g.name} data-section="jogo-generico"><span>${g.name}</span></button></li>`
        });
        section.innerHTML = html;
    }

    startGame(selectedGame) {
        let section = document.getElementById(`generic-game-numbers`);
        this._selectedGame = {};
        this._selectedNumbers = [];
    
        this._games.forEach(g => {
            if(g.name == selectedGame) {
                this._selectedGame = g;
            }
        });

        let html = "";
        for(let i = 1; i <= this._selectedGame.numbersAmount; i++) {
            html += `<button type="button" class="btn-number btn-smallest">${i}</button>`
        }

        section.innerHTML = html;

        let buttonsNumbers = document.querySelectorAll(".btn-number");
        buttonsNumbers.forEach(button => {
            button.addEventListener("click", event => {
                let existNumber = event.target.classList.contains("is-active");

                if(existNumber) {
                    this._removeNumberList(event.target.textContent);
                    event.target.classList.remove("is-active");
                } else if(!existNumber && this._selectedNumbers.length < this._selectedGame.maxNumbers) {
                    this._addNumberToList(event.target.textContent)
                    event.target.classList.add("is-active");
                }

            });
        })
    }

    _addNumberToList(number) {
        this._selectedNumbers.push(number);
    }

    _removeNumberList(number) {
        let index = this._selectedNumbers.indexOf(number);
        this._selectedNumbers.splice(index,1);
    }

    confirmGame() {
        if(this._selectedNumbers.length < this._selectedGame.minNumbers) {
            console.log(`Você precisa selecionar no mínimo ${this._selectedGame.minNumbers} números`);
        } else if(this._selectedNumbers.length > this._selectedGame.maxNumbers) {
            console.log(`Você precisa selecionar menos de ${this._selectedGame.maxNumbers} números`);
        }

        this._checkout.push({
            gameId: this._selectedGame.id,
            numbers: this._selectedNumbers
        });

        console.log(this._checkout);
    }

}