var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";

refreshPage();
$("#utilisateur").text(gameInfo["name"]);
console.log(gameInfo["name"])

//Periodic call -> Refresh page
function refreshPage(){
	$.get(domain+"/map/"+gameInfo.name).done(function(data){
	});
}