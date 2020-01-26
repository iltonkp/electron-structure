const AbstractController = require("./abstractController.js");
const PaymentService = require("../services/payment-service.js");

class PaymentController extends AbstractController {
  constructor(event) {
    super(event);
    this._paymentService = new PaymentService();
    this._loadEvents();
  }

  _loadEvents() {
    this._pay();
  }

  _pay() {
    this._addEvents("#pay", "click", event => {
      this._paymentService.startPayment(50, "123456789");
    });
  }
}

module.exports = new PaymentController(event);
