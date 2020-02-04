const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://api-caixa.herokuapp.com/',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXRoZXVzLmx1YmFyaW5vMUBnbWFpbC5jb20iLCJhdXRoIjpbXSwiaWF0IjoxNTgwODU1MzM5LCJleHAiOjE1ODA5NDE3Mzl9.23YCJQpuhH8NTqsQSulKqfjgUao1aHquJManKQh6kBc'
    }
});
