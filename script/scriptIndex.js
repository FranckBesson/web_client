var domain = "http://webserverlemonade.herokuapp.com"
$(".loader").hide();
$(".start").click(function(){
	$(".loader").show()
	//debugger;
	information = $(".id").val();
	data = {"name" : information};
	str = JSON.stringify(data);
	//debugger;
	$.ajax({
		type: "POST",
		url: domain+"/players",
		data: str,
		contentType: 'application/json'
	})
	.done(function(e) {
		console.log();
		localStorage.setItem("gameInfo",JSON.stringify(e));
		console.log(localStorage.getItem("gameInfo"));
		//debugger;
		window.location.href = "home.html";

	})
	.fail(function(e) {
		$(".loader").hide()
		console.log("testfail : "+e.response)
		alert("Echec de connexion !")
	});

});