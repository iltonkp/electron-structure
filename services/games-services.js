const axios = require("../configs/api");

module.exports = class GameService {
    constructor() {
        this._games = [];
        this._selectedNumbers = [];
        this._getAllGames();
    }

    _getAllGames() {
        
        axios.get('game').then(result => {
            this._games = result;
        });

        return this._games;
    }

    startGame(selectedGame) {
        let section = document.getElementById(`${selectedGame}-new-game`);
        let game = null;
        
        this._games.data.forEach(g => {
            if(g.name.toLowerCase() == selectedGame) {
                game = g; 
            }
        });

        let html = "";
        for(let i = 1; i <= game.numbersAmount; i++) {
            html += `<button type="button" class="btn-number">${i}</button>`
        }

        section.innerHTML = html;

        let buttonsNumbers = document.querySelectorAll(".btn-number");
        buttonsNumbers.forEach(button => {
            button.addEventListener("click", event => {
                let existNumber = event.target.classList.contains("active");

                if(existNumber) {
                    event.target.classList.remove("active");
                } else {
                    event.target.classList.add("active");
                }

                this._modifyNumberList(existNumber, event.target.textContent);

            });
        })
    }

    _modifyNumberList(existNumber, number) {
        if(existNumber) {
            let index = this._selectedNumbers.indexOf(number);
            this._selectedNumbers.splice(index,1);
        } else {
            this._selectedNumbers.push(number);
        }
    }

}