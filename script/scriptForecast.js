var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
console.log(gameInfo);
var domain = "http://webserverlemonade.herokuapp.com";

function displayForecast(){
  $.ajax('/forecast').done(function(data){
  var jour0 = data.weather[0].dfn;
  var meteo0 = data.weather[0].weather;
  var meteo1 = data.weather[1].weather;


  if (jour0 == 0) {
      switch (meteo0) {
        case "RAINY":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/rainy.png\">") ;
          break;

        case "CLOUDY":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/cloudy.jpg\">");
          break;

        case "HEATWAVE":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/heatwave.png\">") ;
          break;

        case "SUNNY":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/sunny.png\">") ;
          break;

        case "THUNDERSTORM":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/thunderstorm.png\">") ;
          break;
        default:
      }

      switch (meteo1) {
        case "RAINY":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/rainy.png\">") ;
          break;

        case "CLOUDY":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/cloudy.jpg\">");
          break;

        case "HEATWAVE":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/heatwave.png\">") ;
          break;

        case "SUNNY":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/sunny.png\">") ;
          break;

        case "THUNDERSTORM":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/thunderstorm.png\">") ;
          break;
        default:
  		  break;
      }


  } else if (jour0 == 1) {
      switch (meteo0) {
        case "RAINY":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/rainy.png\">") ;
          break;

        case "CLOUDY":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/cloudy.jpg\">");
          break;

        case "HEATWAVE":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/heatwave.png\">") ;
          break;

        case "SUNNY":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/sunny.png\">") ;
          break;

        case "THUNDERSTORM":
        $("#tmrForecast").html("<img class=\"logo\" src=\"./include/thunderstorm.png\">") ;
          break;
        default:
  		  break;
      }

      switch (meteo1) {
        case "RAINY":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/rainy.png\">") ;
          break;

        case "CLOUDY":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/cloudy.jpg\">");
          break;

        case "HEATWAVE":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/heatwave.png\">") ;
          break;

        case "SUNNY":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/sunny.png\">") ;
          break;

        case "THUNDERSTORM":
        $("#todayForecast").html("<img class=\"logo\" src=\"./include/thunderstorm.png\">") ;
          break;
        default:
      }
  }
})
}
