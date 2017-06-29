var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";

$("#utilisateur").text(gameInfo["name"]);
console.log(gameInfo["name"])

$("#restricition").dialog({
	autoOpen: true,
	modal: true,
  	buttons: {
    "Ok": function() {
      $( this ).dialog( "close" );
    }
  }
});
