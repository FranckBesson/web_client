var domain = "https://webserverlemonade.herokuapp.com"
$("#get_server").click(function(){

	$.ajax(domain+"/metrology").then(function(text){
		console.log(text)
		$("#get_server").val(text);
	});
});
// POST pour identification
$("#sendId").click(function(){
	id = $("#id").val();
	data = {"id" : id}
	str = JSON.stringify(data)
	$("#id").val("");
	$.ajax({
		type: "POST",
		url: domain+"/sales",
		data: str,
		dataType: 'json'
	}).done(function(e) {
  	console.log(e)
  });
});

// POST pour les boissons
$("#sendboiss1").click(function(){
	id = $("#boiss1").val();
	data = {"boiss1" : id}
	str = JSON.stringify(data)
	$("#boiss1").val("");
	$.ajax({
		type: "POST",
		url: domain+"/sales",
		data: str,
		dataType: 'json'
	}).done(function(e) {
  	console.log(e)
  });
});
