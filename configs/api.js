const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://api-caixa.herokuapp.com/',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXRoZXVzLmx1YmFyaW5vMUBnbWFpbC5jb20iLCJhdXRoIjpbXSwiaWF0IjoxNTgxMTk3NjU3LCJleHAiOjE1ODEyODQwNTd9.K0dAPPx9ifkg085nCCzgEc1amdO9doK3VIndbyciP-8'
    }
});
