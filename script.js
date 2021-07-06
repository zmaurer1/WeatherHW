var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=kirkland&appid=946589300faa58bd006cbc7b14ca420c"
var requestUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=bangor&appid=946589300faa58bd006cbc7b14ca420c"
var requestUrl3 = "https://api.openweathermap.org/data/2.5/weather?q=omaha&appid=946589300faa58bd006cbc7b14ca420c"
var temp = ""
// moment().format;

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        temp = data.main.temp
        console.log(temp)
    })

    fetch(requestUrl2)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        temp = data.main.temp
        console.log(temp)
    })

    fetch(requestUrl3)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        temp = data.main.temp
        console.log(temp)
    })



