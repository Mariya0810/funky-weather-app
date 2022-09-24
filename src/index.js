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

function displayForecast () {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day){
    forecastHTML = forecastHTML + `<div class="col m-1 border weather-card">
                    <p class="text-other">${day}</p></br>
          <p><img src="http://openweathermap.org/img/wn/10d@2x.png" id="icon"></img></p>
                    <p class="temp-other">
                    <span class ="temp-max">18°</span> 
                    <span class="temp-min">10°</span>
                    </p>
                         </div>`
  })
  forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

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

}
function search(city) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchValue = document.querySelector(".form-control");
  let city = searchValue.value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

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
displayForecast ();
