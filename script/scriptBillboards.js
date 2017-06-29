var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";
$("#bbprice").text("10");
refreshPage();
$("#okOrder").dialog({
	autoOpen: false,
	modal: true,
  	buttons: {
    "Ok": function() {
      $( this ).dialog( "close" );
    }
  }
});
$("#orderFail").dialog({
	autoOpen: false,
	modal: true,
  	buttons: {
    "Ok": function() {
      $( this ).dialog( "close" );
    }
  }
});






$("#utilisateur").text(gameInfo["name"]);

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
	var temp = {"actions":[]};
	temp.actions.push({"kind":"ad","location":{"latitude":latitude,"longitude":longitude},"radius":sizeint});
	$.ajax({
			type: "POST",
			url: domain+"/actions/"+gameInfo["name"],
			data: JSON.stringify(temp),
			contentType: 'application/json'
		}).done(function(e) {
			$(".loader").hide();
			console.log(e.sufficientFunds)
			if(e.sufficientFunds == true){
				$("#okOrder").dialog("open");
			}
			else
			{
				$("#orderFail").dialog("open");
			}
			//debugger;

		})
		.fail(function(e) {
			$(".loader").hide();
			console.log("Fail: "+e.response);
			alert("Echec de connexion !");
		});
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
		updateTable(getMyStands());
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



function getMyStands(){
	myItems = gameInfo.map.itemsByPlayer[gameInfo.name];
	console.log(myItems);
	stands = []
	for(i in myItems){
		if(myItems[i].kind == "AD"){
			
			stands.push(myItems[i]);
		}
	}
	
	return stands;
}


function updateTable(stands){
	$("#bbTable tr:not(:first)").remove();
	for(i in stands){
		var latitudeAd = stands[i].location.latitude;
		var longitudeAd = stands[i].location.longitude;
		var sizeAd = stands[i].influence;
		var number = parseInt(i)+1
		$("#bbTable tr:last").after("<tr><td>"+number+"</td><td>"+latitudeAd+"</td><td>"+longitudeAd+"</td><td>"+sizeAd+"</td></tr>");
	}
}



