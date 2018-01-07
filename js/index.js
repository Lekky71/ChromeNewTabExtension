function sendMessage() {
    // randomizeImage();

    chrome.runtime.sendMessage({action: "getCurrentForecast"}, function(response) {
        if (response === null) {
            setTimeout(sendMessage, 2000);
        } else {
            showResult(response);
        }
    });

}

function showResult(response) {
    let tempSpan = document.getElementById("temperature");
    let windSpan = document.getElementById("wind");
    let humiditySpan = document.getElementById("humidity");
    let pressureSpan = document.getElementById("pressure");
    let sunriseSpan = document.getElementById("sunrise");
    let sunsetSpan = document.getElementById("sunset");
    let cityName = document.getElementById("city-name");

    tempSpan.textContent = response.currently.temperature + " ˚C";
    windSpan.textContent = response.currently.windSpeed +" kph";
    humiditySpan.textContent = response.currently.humidity + " %";
    pressureSpan.textContent = response.currently.pressure + " mm Hg";
    cityName.textContent = response.timezone.split("/")[1];

    let sunRiseDate = new Date(response.daily.data[0].sunriseTime);
    let sunSetDate = new Date(response.daily.data[0].sunsetTime);
    sunriseSpan.textContent = sunRiseDate.toLocaleTimeString();  // -> "7:38:05 AM";
    sunsetSpan.textContent = sunSetDate.toLocaleTimeString();
}

document.addEventListener('DOMContentLoaded', sendMessage);
document.addEventListener('DOMContentLoaded', randomizeImage);


// document.getElementById("bookmarklink").addEventListener('click', checkBookmark);
function checkBookmark() {
    // window.location.href = 'chrome://bookmarks'
    chrome.runtime.sendMessage({action: "checkBookmark"}, function(response) {
        if (response === null) {
            setTimeout(sendMessage, 2000);
        } else {
            console.log(response);
        }
    });

}
// $(document).ready(function($) {
//     $("#bookmark").onclick = ()=>{
//         chrome.bookmarks.getTree((allBookmarksArray) => {
//             console.log(allBookmarksArray);
//         });
//     }
//
// });
// https://api.forecast.io/forecast/6ee8d
// // e3e1a315894761e9006065cffde/6.5244,3.3792?units=si&lang=pt&exclude=minutely,hourly,alerts,flags
// Sample weather Request


function randomizeImage() {
    let base = "../images/backgrounds/";
    document.body.style.backgroundImage = "url(" + base + getRandomInt(1, 21) +".jpg"+ ")";
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

