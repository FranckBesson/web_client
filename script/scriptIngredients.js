var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";

$("#name").text(gameInfo["name"]);
console.log(gameInfo["name"])