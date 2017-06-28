var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";

var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";

function dynamicBillboard(){
	  $.ajax('http://webserverlemonade.herokuapp.com/map').done(function(data){
		  var i = 0;
			var j = 0;
		  $("#bbspawn").html("ta mere ");
		  while (data.map.itemsbyplayer[i] != ""){
				if(data.map.itemsbyplayer[i].kind == "ad"){
					var latitude = data.map.itemsbyplayer[i].location.latitude ;
				 	var longitude = data.map.itemsbyplayer[i].location.longitude ;
				 	var taille = data.map.itemsbyplayer[i].influence;
				 	if (taille < 30 && taille > 0) var size = "Small" ;
					else if (taille >= 30 && taille < 50) var size = "Medium";
					else if (taille >= 50 && taille < 80) var size = "Big" ;
				 	else var size = "Fuckin\' Huge";

				 	//$("#bbspawn").html("<span><b>Number "+ (i+1) +":</b></span><ul><li>Position: <span>"+latitude+"</span> / <span>"+longitude+"</span></li> <li>Size: <span>"+size+"</span></li></ul>");

				 	//$("#mainTable tr:not(:first)").remove();
				 	$("#bbTable tr:last").after("<tr> <td>"+(j+1)+"</td><td>"+latitude+"</td><td>"+longitude+"</td><td>"+size+"</td> </tr>");
					j++;
					i++;
					} else i++ ;
				}
			})
		}

$(function(){
	dynamicBillboard();
})
