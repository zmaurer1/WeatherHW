var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var citySeach = $("#searchTerm").val();
const apiKey = "&APPID=946589300faa58bd006cbc7b14ca420c";
var temp = "";
var humidity = "";
var windSpeed = "";
var uvIndex = "";
var fiveDay = "";



$(document).ready(function(){
    $("#search-button").on("click", function(){
        event.preventDefault()
        var cityInput = $("#searchInput").val()
        searchWeatherInfo(cityInput)
        console.log("button clicked")
    })
    function searchWeatherInfo(cityInput){
        $.ajax({
            method:"GET", 
            url:requestUrl+cityInput+apiKey+"&units=imperial",
            dataType:"json", 
            success:function(data){
                console.log(data)
                $.ajax({
                    method:"GET",
                    url:"https://api.openweathermap.org/data/2.5/uvi?"+apiKey+"&lat="+data.coord.lat+"&lon="+data.coord.lon,
                    dataType:"json",
                    success:function(data){
                var uviBtn=$("<button>").addClass("btn").attr("type", "submit").text(data.value)
                var uvIndex=$("<h6>").addClass("card.text").css("paddingTop", "25px").text("UV index: ")
                if (data.value<4){
                    uviBtn.addClass("btn-success")

                }else if(data.value<7){
                    uviBtn.addClass("btn-warning")
                }else{
                    uviBtn.addClass("btn-danger")

                }
                uvIndex.append(uviBtn)
                cardBody.append(uvIndex)
                    }
                })
                console.log(data)
                $("weather-today").empty()
                var card=$("<div>").addClass("card")
                var cardBody=$("<div>").addClass("card-body")
                var title=$("<h2>").text("City: "+data.name)
                var image=$("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png") 
                var temp=$("<h6>").addClass("card-text").css("paddingTop", "25px").text("Temperature: "+data.main.temp+" °F")
                var humidity=$("<h6>").addClass("card-text").css("paddingTop", "25px").text("Humidity: "+data.main.humidity+" %")
                var wind=$("<h6>").addClass("card-text").css("paddingTop", "25px").text("Windspeed: "+data.wind.speed+" MPH")
                title.append(image)
                cardBody.append(title, temp, humidity, wind)
                card.append(cardBody)
                $("#weather-today").append(card)
                foreCast(cityInput)
            }
        })

    }
    function foreCast(cityInput){
        $.ajax({
            type:"GET",
            url:"https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput +apiKey+"&units=imperial",
            dataType:"json",
            success:function(data){
            $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">")
            console.log(data)
            for (i=0;i<data.list.length;i++){
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1){
                    var col=$("<div>").addClass("col-md-2")
                    var card=$("<div>").addClass("card bg-primary text-white")
                    var body=$("<div>").addClass("card-body p-2")
                    var image=$("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                    var foreCastTemp=$("<p>").addClass("card-text").text("Temp: "+data.list[i].main.temp_max+" ºF")
                    var humid=$("<p>").addClass("card-text").text("Humidity: "+data.list[i].main.humidity+" %")
                    var formattedDate=moment(data.list[i].dt_txt).format("L")
                    var forecastDates=$("<p>").addClass("card-text").text(formattedDate)
                    col.append(card)
                    card.append(body)
                    body.append(forecastDates,image,foreCastTemp,humid)
                    $("#forecast .row").append(col)
                }
            }
            }
        })
    }
})














s