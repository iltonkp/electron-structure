const axios = require("../configs/api");

module.exports = class GameService {
    constructor() {
        this._games = [];
    }

    async getAllGames() {
        try {
            this._games = await axios.get('game');
        } catch (error) {
            console.log(error);
        }

        return this._games;
    }

}