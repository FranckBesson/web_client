var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";
 
refreshPage();
$("#restricition").dialog({
  autoOpen: true,
  modal: true,
    buttons: {
    "Ok": function() {
      $( this ).dialog( "close" );
    }
  }
});

 
 
 
 
 
//Click on order button
$("#createbutton").click(function(){
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
});

//Periodic call -> Refresh page
function refreshPage(){
 
  //R9
  $.get(domain+"/ingredients").done(function(data){
    console.log(data)
    $("#utilisateur").text(gameInfo["name"]);
    gameInfo.availableIngredients = data.ingredients
    localStorage.setItem("gameInfo",JSON.stringify(gameInfo));
  });
 
}
