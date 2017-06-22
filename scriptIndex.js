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
		debugger;
		console.log(e["name"]);
		localStorage.setItem('test',"tetttt");

		//alert("Connexion reussie !")
		window.location.href = "home.html";
	})
	.fail(function(e) {
		console.log("testfail : "+e.response)
		alert("Echec de connexion !")
	});
});