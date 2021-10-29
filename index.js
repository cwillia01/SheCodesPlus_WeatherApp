// delare local variables
let tempMin, tempMax

////////////////////  Today's Date     ////////////////////
function todayDate() { 
    let now = new Date()
    let day = now.getDay()
    let hour = now.getHours()
    let min = now.getMinutes()

    let todaydate = now.toTimeString();
    todaydate = todaydate.split(" ")[0];


    let dayList = [
        "Sunday",
        "Monday", 
        "Tuesday", 
        "Wednesday",
        "Thursday", 
        "Friday", 
        "Saturday"
    ]


    let dateElem = document.querySelector("#date-today"); 
    dateElem.innerHTML = dayList[day] + " " + todaydate;
   //console.log(dayList[day] + " " + hour + ":" + min)
}

todayDate()
////////////////////   END Today's Date     ////////////////////


/////////////////// Today's Weather ///////////////////
function getWeather() {
    let apiKey = "bbd38691e217276012656e77f1249e98"
    let city = "Edinburgh"
    let units = "metric"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
    axios.get(apiUrl).then(getResponse);
}


function getResponse(response) {
    tempMax = Math.round(response.data.main.temp_max);
    tempMin = Math.round(response.data.main.temp_min);
    let desc = response.data.weather[0].main

    //log coords for the forecast response
    getLatLon(response.data.coord);
  
    let lowElem = document.querySelector(".low-temp"); 
    lowElem.innerHTML = tempMin + "°C";
    let highElem = document.querySelector(".high-temp"); 
    highElem.innerHTML = tempMax + "°C";
    let windSpeed = document.querySelector("#wind-speed")
    units = " m/s"
    windSpeed.innerHTML =  response.data.wind.speed + units
    let weatherDesc =document.querySelector('#weatherdesc')
    weatherDesc.innerHTML = desc
  
    let todayIcon = document.querySelector("#today-icon")
    let icon = response.data.weather[0].icon
    iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
    todayIcon.setAttribute("src", 
    iconURL
    );
  }

  getWeather();


  //forecast data for city coordinates 
  function returnForecastData(coords) { 
    console.log(coords); 
    let apiKey = "bbd38691e217276012656e77f1249e98"; 
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  //get the coords for the forecast
function getLatLon(coord) { 
  returnForecastData(coord);
}

/////////////////// END Today's Weather ///////////////////


////////////////////////  Change City Name on Search ///////////////////////
let city

function getCity(event) { 
    event.preventDefault(); 
    let input = document.querySelector("#city")

    let citySearch = document.querySelector("#search-city");
    citySearch.innerHTML = input.value 
    city = input.value

    let apiKey = "bbd38691e217276012656e77f1249e98"
    let units = "metric"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
    axios.get(apiUrl).then(getResponse);
}

//add event listener
let form  = document.querySelector("form"); 
form.addEventListener("submit", getCity)

//update temperature when search engine is used
function showResponse(response) {
  let cityTempMax = Math.round(response.data.main.temp_max);
  let cityTempMin = Math.round(response.data.main.temp_min);
  console.log(cityTempMax, cityTempMin);

  let lowElem = document.querySelector(".low-temp"); 
  lowElem.innerHTML = cityTempMin;
  let highElem = document.querySelector(".high-temp"); 
  highElem.innerHTML = cityTempMax;

  let todayIcon = document.querySelector("#today-icon")
  let icon = response.data.weather[0].icon
  iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
  todayIcon.setAttribute("src", 
  iconURL
  );

}
////////////////////////  END Change City Name on Search ///////////////////////


/////////////// Format date time /////////////////////////
function formatDT(timestamp) { 
  let datetime = timestamp * 1000
  let date = new Date(datetime);
  let day = date.getDay()
  
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
  return days[day];

}
/////////////// END Format date time /////////////////////////

////////////////// Weekly Forecast //////////////////////////
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDT(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
////////////////// END Weekly Forecast //////////////////////////
