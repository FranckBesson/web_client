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
	switch (size) {
		case "Small" :
			size = 1
			break
		case "Medium" :
			size = 2
			break
		case "Big" :
			size = 3
			break
		case "Huge" :
			size = 4
			break
	}
	console.log(size);
	var temp = {"actions":[]};
	temp.actions = {"kind":"ad","location":{"latitude":latitude,"longitude":longitude},"radius":size}
	$.ajax({
			type: "POST",
			url: domain+"/action/"+gameInfo["name"],
			data: JSON.stringify(temp.actions),
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