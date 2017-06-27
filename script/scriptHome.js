var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";
saveDrinkOffer = gameInfo.info.drinksOffered;
first = true;
refreshPage();
$(".loader").hide();

//Refresh calculation when edit input
$("input").keypress(calculTable);
$("input").change(calculTable)

//Click on order button
$("#order").click(function(){
	var table = $("#mainTable").children();
	var line = table.children(":first-child");
	var toSend = {"actions":[]};
	var error = false;
	$(".loader").show();
	for(var i = 1; i<table.children().length; i++){
		line = line.next();
		var column = line.children(":first-child");
		console.log(column);
		var name = column.text();
		console.log("Name : "+name);

		column = column.next()
		var qty = column.children().val();
		if($.isNumeric(qty))
		{
			column.children().css("background-color","white")
		}
		else
		{
			column.children().css("background-color","red")
			error = true
		}

		console.log("Qty : "+qty);

		column = column.next().next().next();
		var price = column.children().val();
		if($.isNumeric(price))
		{
			column.children().css("background-color","white")
		}
		else
		{
			column.children().css("background-color","red")
			error = true
		}

		console.log("Price : "+price);
		toSend["actions"].push({"kind":"drinks","prepare":{},"price":{}});
		console.log(toSend);
		toSend["actions"][i-1]["prepare"][name]=qty;
		toSend["actions"][i-1]["price"][name]=price;
	}
	console.log(toSend);
	if(!error)
	{
		$.ajax({
			type: "POST",
			url: domain+"/actions/"+name,
			data: JSON.stringify(toSend),
			contentType: 'application/json'
		})
		.done(function(e) {
			$(".loader").hide();
			console.log(e);
			//debugger;

		})
		.fail(function(e) {
			$(".loader").hide();
			console.log("testfail : "+e.response);
			alert("Echec de connexion !");
		});

	}
	else{
		$(".loader").hide();
		alert("Format error !");
	}
});

//Click on Clear Button
$("#clearall").click(function(){
	var table = $("#mainTable").children();
	var line = table.children(":first-child");
	for(var i = 1; i<table.children().length; i++){

		line = line.next();
		var column = line.children(":first-child");
		column = column.next();
		var qty = column.children().val("");
		column = column.next();
		var column = column.next()
		column.text("0");
		column = column.next()
		var price = column.children().val("");
		column = column.next()
		column.text("0");



		/*
		console.log("Qty : "+qty);

		column = column.next().next();
		var price = column.children().val();
		console.log("Price : "+price);*/
	}
});

//Periodic call -> Refresh page
function refreshPage(){
	//R7
	$.get(domain+"/metrology").done(function(data){
		var cptHeure = data.timestamp;
		var day = (cptHeure/24).toFixed(0);
		var heure = cptHeure%24
		/*
		//R5
		$.get(domain+"/map/"+gameInfo.name).done(function(data){
			debugger;
			var r5Resp = data;
			gameInfo.info = r5Resp.playerInfo;
			gameInfo.map = r5Resp.map;
			gameInfo.availableIngredients = r5Resp.availableIngredients;
			localStorage.setItem("gameInfo",JSON.stringify(gameInfo));
			
		});*/
		$("#day").text(day);
		$("#time").text(heure+":00");	
		$("#cash").text(gameInfo["info"]["cash"]);
		$("#sales").text(gameInfo["info"]["sales"]);
		$("#profit").text(gameInfo["info"]["profit"]);
		$(".name").text(gameInfo["name"]);
		$("#latitude").text(gameInfo.location.latitude);
		$("#longitude").text(gameInfo.location.longitude);


		//clear Table
		if(saveDrinkOffer != gameInfo.info.drinksOffered || first){
			saveDrinkOffer = gameInfo.info.drinksOffered
			first = false;
			console.log("different")
			$("#mainTable tr:not(:first)").remove();
			for(i in gameInfo.info.drinksOffered){
				var name = capitalizeFirstLetter(gameInfo.info.drinksOffered[i].name);
				$("#mainTable tr:last").after("<tr><td><span>"+name+"</span></td><td><input type=\"int\" value=\"\"></td><td><span>"+gameInfo.info.drinksOffered[i].price+"</span></td><td><span>0</span></td><td><input type=\"int\" value=\"\"></td><td><span>0</span></td></tr>");
			}
		}
		setTimeout(refreshPage,2000);
	});

	

	

	
}

//calculate price of drinks
function calculTable()
{
	var table = $("#mainTable").children();
	var line = table.children(":first-child");
	for(var i = 1; i<table.children().length; i++){
		var table = $("#mainTable").children();
		var line = table.children(":first-child");
		for(var i = 1; i<table.children().length; i++){

			line = line.next();
			var column = line.children(":first-child");
			column = column.next();
			var qty = column.children().val();
			if($.isNumeric(qty) || qty == "")
			{
				column.children().css("background-color","white")
			}
			else
			{
				column.children().css("background-color","red")
			}
			column = column.next();
			var unitPrice = column.text();
			var column = column.next()
			column.text((qty*unitPrice).toFixed(2));
			column = column.next()
			var price = column.children().val();
			if($.isNumeric(price) || price == "")
			{
				column.children().css("background-color","white")
			}
			else
			{
				column.children().css("background-color","red")
				error = true
			}
			column = column.next()
			column.text((qty*price).toFixed(2));
		}
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}