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
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  console.log(tempMax, tempMin);

  let lowElem = document.querySelector(".low-temp"); 
  lowElem.innerHTML = tempMin;
  let highElem = document.querySelector(".high-temp"); 
  highElem.innerHTML = tempMax;
}


// add current city button and functionalirt

function updateLocation() { 
    navigator.geolocation.getCurrentPosition(getLocation)
}

function getLocation(position) { 
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(updateCityInfo);
}

function updateCityInfo(response) { 
    console.log(response);
    
    //update city name
    let citySearch = document.querySelector("#search-city");
    citySearch.innerHTML = response.data.name

    //update temps
    let tempMax = Math.round(response.data.main.temp_max);
    let tempMin = Math.round(response.data.main.temp_min);
    let lowElem = document.querySelector(".low-temp"); 
    lowElem.innerHTML = tempMin;
    let highElem = document.querySelector(".high-temp"); 
    highElem.innerHTML = tempMax;
}


let button = document.querySelector("#find-current-city")
button.addEventListener("click", updateLocation)
