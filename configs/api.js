const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://api-caixa.herokuapp.com/',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXRoZXVzLmx1YmFyaW5vMUBnbWFpbC5jb20iLCJhdXRoIjpbXSwiaWF0IjoxNTgwNzYxOTQ2LCJleHAiOjE1ODA4NDgzNDZ9.isUjh7FUvSGz0HIpdyscP40OyaaHl2T7FVQUprw_gDE'
    }
});
