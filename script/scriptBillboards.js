var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";
$("#bbprice").text("10");
refreshPage();

$("#utilisateur").text(gameInfo["name"]);
console.log(gameInfo["name"])
console.log($("#bbsize").val());

//Click on Buy button
$("#buybillboard").click(function(){
	var latitude = $("#bblatitude").val();
	var longitude =$("#bblongitude").val();
	var size = $("#bbsize").val();
	var price = 0
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
	temp.actions.push({"kind":"ad","location":{"latitude":latitude,"longitude":longitude},"radius":sizeint})
	console.log(JSON.stringify(temp))
	$.ajax({
			type: "POST",
			url: domain+"/actions/"+gameInfo["name"],
			data: JSON.stringify(temp),
			contentType: 'application/json'
		})
})

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

$("#bbsize").on('change',function(){
	var size = this.value
	switch (size) {
		case "small" :
			$("#bbprice").text("10");
			break
		case "medium" :
			$("#bbprice").text("20");
			break
		case "big" :
			$("#bbprice").text("30");
			break
		case "huge" :
			$("#bbprice").text("40");
			break
	}
})
