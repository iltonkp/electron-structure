const AbstractController = require("./abstractController.js");

class PaymentController extends AbstractController {
  constructor(event) {
    super(event);
  }
}

module.exports = new PaymentController(event);
