var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
$("#newDay").dialog({
	autoOpen: false,
	modal: true,
  	buttons: {
    "Ok": function() {
      $( this ).dialog( "close" );
    }
  }
});
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


var domain = "http://webserverlemonade.herokuapp.com";
saveDrinkOffer = gameInfo.info.drinksOffered;
savedDay = 0;
first = true;
refreshPage();
$(".loader").hide();



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
		var name = column.text().toLowerCase();;
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
		console.log(JSON.stringify(toSend));
		$.ajax({
			type: "POST",
			url: domain+"/actions/"+gameInfo.name,
			data: JSON.stringify(toSend),
			contentType: 'application/json'
		})
		.done(function(e) {
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

	}
	else{
		$(".loader").hide();
		alert("Format error !");
	}
});

//Click on Clear Button
$("#clearall").click(clearTable());

$("#Refresh").click(updateTable);

//Periodic call -> Refresh page
function refreshPage(){
	//R7
	$.get(domain+"/metrology").done(function(data){
		var cptHeure = data.timestamp;
		var day = Math.floor(cptHeure/24).toFixed(0);
		var heure = cptHeure%24
		if(savedDay != day){
			$("#newDay").dialog('open');
			clearTable();
			savedDay = day;
		}
		updateWeather(data);
		
		//R5
		$.get(domain+"/map/"+gameInfo.name).done(function(data){
			//debugger;
			var r5Resp = data;
			console.log(data);
			gameInfo.info = r5Resp.playerInfo;
			gameInfo.map = r5Resp.map;
			gameInfo.availableIngredients = r5Resp.availableIngredients;
			localStorage.setItem("gameInfo",JSON.stringify(gameInfo));
			$("#day").text(day);
			$("#time").text(heure+":00");	
			$("#cash").text(gameInfo["info"]["cash"].toFixed(2));
			$("#sales").text(gameInfo["info"]["sales"]);
			$("#profit").text(gameInfo["info"]["profit"].toFixed(2));
			$(".name").text(gameInfo["name"]);
			$("#latitude").text(gameInfo.location.latitude);
			$("#longitude").text(gameInfo.location.longitude);
			//clear Table
			if(saveDrinkOffer.length != gameInfo.info.drinksOffered.length || first == true){
				saveDrinkOffer = gameInfo.info.drinksOffered
				first = false;
				console.log("different")
				updateTable();
				
			}
			setTimeout(refreshPage,2000);
			//Refresh calculation when edit input
			$("input").keypress(calculTable);
			$("input").change(calculTable)
			
		});
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


function updateWeather(data){
	var jour0 = data.weather[0].dfn;
	var meteo0 = data.weather[0].weather;
	var meteo1 = data.weather[1].weather;


	if (jour0 == 0) {
		switch (meteo0) {
			case "RAINY":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/rainy.png\">") ;
			break;

			case "CLOUDY":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/cloudy.jpg\">");
			break;

			case "HEATWAVE":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/heatwave.png\">") ;
			break;

			case "SUNNY":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/sunny.png\">") ;
			break;

			case "THUNDERSTORM":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/thunderstorm.png\">") ;
			break;
			default:
		}

		switch (meteo1) {
			case "RAINY":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/rainy.png\">") ;
			break;

			case "CLOUDY":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/cloudy.jpg\">");
			break;

			case "HEATWAVE":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/heatwave.png\">") ;
			break;

			case "SUNNY":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/sunny.png\">") ;
			break;

			case "THUNDERSTORM":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/thunderstorm.png\">") ;
			break;
			default:
			break;
		}


	} else if (jour0 == 1) {
		switch (meteo0) {
			case "RAINY":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/rainy.png\">") ;
			break;

			case "CLOUDY":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/cloudy.jpg\">");
			break;

			case "HEATWAVE":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/heatwave.png\">") ;
			break;

			case "SUNNY":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/sunny.png\">") ;
			break;

			case "THUNDERSTORM":
			$("#tmrForecast").html("<img class=\"logo\" src=\"./include/thunderstorm.png\">") ;
			break;
			default:
			break;
		}

		switch (meteo1) {
			case "RAINY":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/rainy.png\">") ;
			break;

			case "CLOUDY":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/cloudy.jpg\">");
			break;

			case "HEATWAVE":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/heatwave.png\">") ;
			break;

			case "SUNNY":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/sunny.png\">") ;
			break;

			case "THUNDERSTORM":
			$("#todayForecast").html("<img class=\"logo\" src=\"./include/thunderstorm.png\">") ;
			break;
			default:
		}
	}
}

function clearTable(){
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
	}
}


function updateTable(){
	$("#mainTable tr:not(:first)").remove();
	for(i in gameInfo.info.drinksOffered){
		var name = capitalizeFirstLetter(gameInfo.info.drinksOffered[i].name);
		$("#mainTable tr:last").after("<tr><td><span>"+name+"</span></td><td><input type=\"int\" value=\"\"></td><td><span>"+gameInfo.info.drinksOffered[i].price+"</span></td><td><span>0</span></td><td><input type=\"int\" value=\"\"></td><td><span>0</span></td></tr>");
	}
}
