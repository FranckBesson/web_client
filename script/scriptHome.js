cash = localStorage.getItem("cash");
sales = localStorage.getItem("sales");
profit = localStorage.getItem("profit");
drinkOffered = JSON.parse(localStorage.getItem("drinksOffered"));
name = localStorage.getItem("name");
latitude = localStorage.getItem("latitude");
longitude = localStorage.getItem("longitude");
$("#cash").text(cash);
$("#sales").text(sales);
$("#profit").text(profit);
$("#drinksOffered").text("");
for(i = 0 ; i<drinkOffered.length ; i++)
{
	$("#drinksOffered").text($("#drinksOffered").text() + drinkOffered[i]["name"]+" ");
}
$("#name").text(name);
$("#latitude").text(latitude);
$("#longitude").text(longitude);