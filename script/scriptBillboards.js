var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";

//refreshPage();

$(".name").text(gameInfo["name"]);
console.log(gameInfo["name"])
console.log($("#bbsize").val());

//Click on Buy button
$("#buybillboard").click(function(){
	var latitude = $("#bblatitude").val();
	var longitude =$("#bblongitude").val();
	var size = $("#bbsize").val();
	var sizeint = 0
	switch (size) {
		case "small" :
			sizeint = 1
			break
		case "medium" :
			sizeint = 2
			break
		case "big" :
			sizeint = 3
			break
		case "huge" :
			sizeint = 4
			break
	}
	console.log(size);
	var temp = {"actions":[]};
	temp.actions = {"kind":"ad","location":{"latitude":latitude,"longitude":longitude},"radius":sizeint}
	console.log(JSON.stringify(temp))
	$.ajax({
			type: "POST",
			url: domain+"/action/"+gameInfo["name"],
			data: JSON.stringify(temp),
			contentType: 'application/json'
		})
})


function refreshPage(){
	//R5
	$.get(domain+"/map/"+gameInfo.name).done(function(data){
		debugger;
		var r5Resp = data;
		gameInfo.info = r5Resp.playerInfo;
		gameInfo.map = r5Resp.map;
		gameInfo.availableIngredients = r5Resp.availableIngredients;
		localStorage.setItem("gameInfo",JSON.stringify(gameInfo));
		$("#cash").text(gameInfo["info"]["cash"]);
		setTimeout(refreshPage,2000);
	})
};