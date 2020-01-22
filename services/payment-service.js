const axios = require("../configs/api");

module.exports = class PaymentService {
  constructor() {
    this._paymentData = {};
  }

  async startPayment(amount, payNumber) {
    this._paymentData = {
      amount: amount,
      documentNumber: payNumber
    };

    const response = await axios.post("payment", this._paymentData);

    console.log(response);
  }
};
