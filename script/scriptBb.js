var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";

function dynamicBillboard(){
	  $.ajax('/billboards').done(function(data){
		  var i = 0;
		  $("#bbspawn").html("ta mere ");
		  while (data[i] != ""){
			  var latitude = data[i].location.latitude ;
			  var longitude = data[i].location.longitude ;
			  var taille = data[i].influence;
			  if (taille < 50) var size = "Small" ;
			  else var size = "Big";

			  //$("#bbspawn").html("<span><b>Number "+ (i+1) +":</b></span><ul><li>Position: <span>"+latitude+"</span> / <span>"+longitude+"</span></li> <li>Size: <span>"+size+"</span></li></ul>");

				//$("#mainTable tr:not(:first)").remove();
				$("#bbTable tr:last").after("<tr> <td>"+(i+1)+"</td><td>"+latitude+"</td><td>"+longitude+"</td><td>"+size+"</td> </tr>");
				 i++;

				}

	  })
  }

$(function(){
	dynamicBillboard();
})
