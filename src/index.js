let currentDate = document.querySelector(".subtitle");
let now = new Date();
let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let today = days[now.getDay()];
currentDate.innerHTML = `${today} ${hours}:${minutes} CEST`;

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", handleSubmit);


  function handleSubmit(event) {
  event.preventDefault();
  let searchValue = document.querySelector(".form-control");
  let city = searchValue.value;
  search(city);
};

function search(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  };

function showTemp(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;
   if (descriptionElement.innerHTML.match(/^(rain|thunderstorm|shower rain|moderate rain|scattered showers|showers|light rain)$/)){
    document.querySelector("#player").innerHTML=`<p><iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbvABJXBIyiY?utm_source=generator&theme=0" width="190%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></p>`;
  };
  if (descriptionElement.innerHTML.match(/^(overcast clouds|mist|broken clouds|scattered clouds|few clouds)$/)){
    document.querySelector("#player").innerHTML=`<p><iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/3YAVyJshVCi35fyx81egaC?utm_source=generator&theme=0" width="190%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></p>`;
  };
   if (descriptionElement.innerHTML==`clear sky`){
    document.querySelector("#player").innerHTML=`<p><iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/2O5DOhoUcrmRlIZvxaFbVN?utm_source=generator&theme=0" width="190%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></p>`;
  };
   if (descriptionElement.innerHTML==`snow`){
    document.querySelector("#player").innerHTML=`<p><iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/1dC149rn4sVCbrsvnt2bWX?utm_source=generator&theme=0" width="190%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></p>`;
  };
   
 getForecast(response.data.coord);
 }


function displayForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  function formatDay(timestamp){
    let date = new Date (timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index<5){
    forecastHTML = forecastHTML + `<div class="col m-1 border weather-card">
                    <p class="text-other">${formatDay(forecastDay.dt)}</p></br>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>
                    <p class="temp-other">
                    <span class ="temp-max">${Math.round(forecastDay.temp.max)}°</span> 
                    <span class="temp-min">${Math.round(forecastDay.temp.min)}°</span>
                    </p>
                         </div>`}
  });
  forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    }

    function getForecast (coordinates){
    let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayForecast);
  }


function searchLocation(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemp (event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let FahrenheitTemp = Math.round((celsiusTemperature * 9/5) + 32);
  temperatureElement.innerHTML = FahrenheitTemp;
}

function showCelsiusTemp (event){
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);


search("Parma");

