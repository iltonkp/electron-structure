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
        });

        let logo = document.getElementById("game-logo");
        logo.classList.add(this._selectedGame.name.toLowerCase().replace("-",""));

        let gameName = document.getElementById("game-name");
        gameName.innerHTML = this._selectedGame.name;
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
            alert(`Você precisa selecionar no mínimo ${this._selectedGame.minNumbers} números`);
            return;
        } else if(this._selectedNumbers.length > this._selectedGame.maxNumbers) {
            alert(`Você precisa selecionar menos de ${this._selectedGame.maxNumbers} números`);
            return;
        }

        let formatedNumbers = "";
        let currentNumberSize = 0;

        this._selectedNumbers.forEach(number => {
            formatedNumbers += number;
            currentNumberSize++;
            if(currentNumberSize < this._selectedNumbers.length) {
                formatedNumbers += " - ";
            }
        });

        this._checkout.push({
            game: this._selectedGame,
            numbers: this._selectedNumbers,
            formatedNumbers
        });

        //if everything it's ok
        return true;
    }

    loadTableGame() {
        let table = document.getElementById("table-games");

        let html = "";
        this._checkout.forEach(checkout => {
            html += `<tr>
                        <td>Jogo ${checkout.game.name}: <strong>${checkout.formatedNumbers}</strong></td>
                        <td>R$ 2,50</td>
                    </tr>`
        });

        table.innerHTML = html;
    }

    async doCheckout(finalize = true) {
        let objectDTO = [];
        this._checkout.forEach(c => {
            let object = {numbers: c.formatedNumbers, gameId: c.game.id, finalize}
            objectDTO.push(object);
        });

        let res = await axios.post('contest/to-bet', objectDTO);

        console.log(res);
    }

}