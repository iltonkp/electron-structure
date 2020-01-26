const axios = require("axios");

module.exports = axios.create({
  baseURL: "https://api-caixa.herokuapp.com/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXRoZXVzLmx1YmFyaW5vMUBnbWFpbC5jb20iLCJhdXRoIjpbXSwiaWF0IjoxNTgwMDQ5NDIwLCJleHAiOjE1ODAwNTMwMjB9.1MdS6BewQLpSzJiacOpXOkr248Fzr-OKcAn-YsjTLn4"
  }
});
