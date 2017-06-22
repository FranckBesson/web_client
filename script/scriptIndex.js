var domain = "http://webserverlemonade.herokuapp.com"

$(".start").click(function(){
	debugger;
	Information = $("#information").val();
	data = {"information" : Information}
	str = JSON.stringify(data)
	$("#information").val("info");
	console.log(str)
	$.ajax({
			type: "POST",
		url: domain+"/sales",
			data: str,
			contentType: 'application/json'
	})
	.done(function(e) {
			console.log(e)
			//alert("Connexion reussie !")
			window.location.href = "home.html";
		})
		.fail(function(e) {
		console.log("testfail : "+e.response)
		alert("Echec de connexion !")
	});
});