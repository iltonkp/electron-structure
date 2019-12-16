const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://api-caixa.herokuapp.com/',
});
