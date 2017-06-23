var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";
$("#cash").text(gameInfo["info"]["cash"]);
$("#sales").text(gameInfo["info"]["sales"]);
$("#profit").text(gameInfo["info"]["profit"]);
$("#utilisateur").text(gameInfo["name"]);
$("#latitude").text(gameInfo.location.latitude);
$("#longitude").text(gameInfo.location.longitude);
drinkOffered = gameInfo["info"]["drinksOffered"];

for(i = 0 ; i<drinkOffered.length ; i++)
{
	$("#drinksOffered").text($("#drinksOffered").text() + drinkOffered[i]["name"]+" ");
}



$("input").change(function(){
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
			column.text(qty*unitPrice);
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
			column.text(qty*price);
		}
	}
});


$("#order").click(function(){
	var table = $("#mainTable").children();
	var line = table.children(":first-child");
	var toSend = {"action":[]};
	var error = false;
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
		toSend["action"].push({"kind":"drinks","prepare":{name:qty},"price":{name:price}});
	}
	console.log(JSON.stringify(toSend));
	if(!error)
	{
		$.ajax({
			type: "POST",
			url: domain+"/actions/"+name,
			data: JSON.stringify(toSend),
			contentType: 'application/json'
		})
		.done(function(e) {
			console.log(e);
			//debugger;

		})
		.fail(function(e) {
			$(".loader").hide()
			console.log("testfail : "+e.response)
			alert("Echec de connexion !")
		});
	
	}
	else{
		alert("Format error !");
	}
	

	

	//debugger;
});



$("#clearall").click(function(){
	var table = $("#mainTable").children();
	var line = table.children(":first-child");
	for(var i = 1; i<table.children().length; i++){
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
	}
});