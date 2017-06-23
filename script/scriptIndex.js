var domain = "http://webserverlemonade.herokuapp.com"

$(".start").click(function(){
	//debugger;
	information = $(".id").val();
	data = {"name" : information};
	str = JSON.stringify(data);
	$(".id").val("");
	//debugger;
	$.ajax({
		type: "POST",
		url: domain+"/players",
		data: str,
		contentType: 'application/json'
	})
	.done(function(e) {
		console.log();
		localStorage.setItem("cash",e["info"]["cash"]);
		localStorage.setItem("sales",e["info"]["sales"]);
		localStorage.setItem("profit",e["info"]["profit"]);
		localStorage.setItem("drinksOffered",JSON.stringify(e["info"]["drinksOffered"]));
		localStorage.setItem("name",e["name"]);
		localStorage.setItem("latitude",e["location"]["latitude"]);
		localStorage.setItem("longitude",e["location"]["longitude"]);
		console.log(JSON.stringify(e["info"]["drinksOffered"]));
		window.location.href = "home.html";
	})
	.fail(function(e) {
		console.log("testfail : "+e.response)
		alert("Echec de connexion !")
	});
});