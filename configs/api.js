const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://api-caixa.herokuapp.com/',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXRoZXVzLmx1YmFyaW5vMUBnbWFpbC5jb20iLCJhdXRoIjpbXSwiaWF0IjoxNTgwNDM0Mjg4LCJleHAiOjE1ODA1MjA2ODh9.qLUiZ5rQ4At8-FohZ5VmSzlvl5a7H7U1aFU2cyB1D2Q'
    }
});
