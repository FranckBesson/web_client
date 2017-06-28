var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";
var utilisateur = gameInfo.name;

function dynamicBillboard(){
	  $.ajax('http://webserverlemonade.herokuapp.com/map/'+utilisateur).done(function(data){
		  var i = 0;
		  while (data.playerInfo.drinksOffered[i] != ""){
        var name = data.playerInfo.drinksOffered[i].name;
        var price = data.playerInfo.drinksOffered[i].price;
        var alcohol = data.playerInfo.drinksOffered[i].hasalcohol;
        var cold = data.playerInfo.drinksOffered[i].iscold;

				if (alcohol == true) alcohol = "Yes";
				else alcohol = "No" ;

				if (cold == true) cold = "Yes";
				else cold = "No" ;

        $("#recipeTable tr:last").after("<tr> <td>"+name+"</td><td>"+price+" € </td><td>"+alcohol+"</td><td>"+cold+"</td> </tr>");
				i++;

			}
		})
	}

$(function(){
	dynamicBillboard();
})
