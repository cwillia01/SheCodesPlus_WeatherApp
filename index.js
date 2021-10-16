
let tempMin, tempMax

//set the date in the date-today paragraph
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



//get results for edinburgh today

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
  
    let lowElem = document.querySelector(".low-temp"); 
    lowElem.innerHTML = tempMin;
    let highElem = document.querySelector(".high-temp"); 
    highElem.innerHTML = tempMax;
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

//////// add temperature conversions 

//convert to Farhen
function displayFarhenTemp(event){ 
  event.preventDefault(); 
  let lowtempElem = document.querySelector(".low-temp"); 
  let hightempElem = document.querySelector(".high-temp");
  //active links"
  convertCel.classList.remove("active"); 
  convertFarhen.classList.add("active"); 
  //I could make this calc a function of its own.
  let lowfarhenTemp = (tempMin * 9) / 5 + 32; 
  let highfarhenTemp = (tempMax * 9) / 5 + 32;
  lowtempElem.innerHTML = Math.round(lowfarhenTemp);
  hightempElem.innerHTML = Math.round(highfarhenTemp);
}

let convertFarhen = document.querySelector("#farhen")
convertFarhen.addEventListener("click", displayFarhenTemp);

//convert to Cel

function displayCelTemp(event){ 
  event.preventDefault(); 
  convertFarhen.classList.remove("active"); 
  convertCel.classList.add("active"); 

  let lowtempElem = document.querySelector(".low-temp"); 
  let hightempElem = document.querySelector(".high-temp");

  lowtempElem.innerHTML = Math.round(tempMin);
  hightempElem.innerHTML = Math.round(tempMax);
}

let convertCel = document.querySelector("#cel")
convertCel.addEventListener("click", displayCelTemp)


//get result from search engine and update the heading
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
    axios.get(apiUrl).then(showResponse);
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


// add current city button and functionality

// function updateLocation() { 
//     navigator.geolocation.getCurrentPosition(getLocation)
// }

// function getLocation(position) { 
//     let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//     axios.get(url).then(updateCityInfo);
// }

// function updateCityInfo(response) { 
//     console.log(response);
    
//     //update city name
//     let citySearch = document.querySelector("#search-city");
//     citySearch.innerHTML = response.data.name

//     //update temps
//     let tempMax = Math.round(response.data.main.temp_max);
//     let tempMin = Math.round(response.data.main.temp_min);
//     let lowElem = document.querySelector(".low-temp"); 
//     lowElem.innerHTML = tempMin;
//     let highElem = document.querySelector(".high-temp"); 
//     highElem.innerHTML = tempMax;

//     //update icons
//     let todayIcon = document.querySelector("#today-icon")
//     let icon = response.data.weather[0].icon
//     iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
//     todayIcon.setAttribute("src", 
//     iconURL
//     );
// }


// let button = document.querySelector("#find-current-city")
// button.addEventListener("click", updateLocation)
