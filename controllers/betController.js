const AbstractController = require("./abstractController.js");

class BetController extends AbstractController {

    constructor(event) {
        debugger;
        super(event);
    }
}

module.exports = new BetController(event);