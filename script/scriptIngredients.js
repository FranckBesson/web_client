var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";
refreshPage()


$(".name").text(gameInfo["name"]);
console.log(gameInfo["name"])

function refreshPage(){
	//R5
	$.get(domain+"/map/"+gameInfo.name).done(function(data){
		var r5Resp = data;
		gameInfo.info = r5Resp.playerInfo;
		gameInfo.map = r5Resp.map;
		gameInfo.availableIngredients = r5Resp.availableIngredients;
		localStorage.setItem("gameInfo",JSON.stringify(gameInfo));
		$("#cash").text(gameInfo["info"]["cash"]);
		setTimeout(refreshPage,2000);
	})
};