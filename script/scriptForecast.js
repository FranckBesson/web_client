var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";

function displayForecast{
  var myImg = new Image
  $.ajax('/forecast').done(function(data){
  var jour = data.dfn;
  var meteo = data.weather;

  if (jour == 0){
    switch (weather) {
      case rainy:
      $("#todayForecast").html(<img class="logo" src="./include/rainy.png">) ;
        break;

      case cloudy:
      $("#todayForecast").html(<img class="logo" src="./include/cloudy.jpg">);
        break;

      case heatwave:
      $("#todayForecast").html(<img class="logo" src="./include/heatwave.png">) ;
        break;

      case sunny:
      $("#todayForecast").html(<img class="logo" src="./include/sunny.png">) ;
        break;

      case thunderstorm:
      $("#todayForecast").html(<img class="logo" src="./include/thunderstorm.png">) ;
        break;
      default:
    }
  }else if (jour == 1){
    switch (weather) {
      case rainy:
      $("#tmrForecast").html(<img class="logo" src="./include/rainy.png">) ;
        break;

      case cloudy:
      $("#tmrForecast").html(<img class="logo" src="./include/cloudy.jpg">);
        break;

      case heatwave:
      $("#tmrForecast").html(<img class="logo" src="./include/heatwave.png">) ;
        break;

      case sunny:
      $("#tmrForecast").html(<img class="logo" src="./include/sunny.png">) ;
        break;

      case thunderstorm:
      $("#tmrForecast").html(<img class="logo" src="./include/thunderstorm.png">) ;
        break;
      default:
    }
  }
}
