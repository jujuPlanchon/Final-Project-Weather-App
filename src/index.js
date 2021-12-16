let now = new Date();
let currentTime = document.querySelector("#date");

let jour = now.getDate();
let year = now.getUTCFullYear();
let weeks = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let week = weeks[now.getDay()];
let mois = months[now.getMonth()];
currentTime.innerHTML = `${week}, ${jour}, ${mois}, ${year}`;

let time = new Date();
let hoursNow = document.querySelector("#hour");
let hours = time.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
hoursNow.innerHTML = `${hours}:${minutes}`;

function displayForecast(response) {
  let dailyForecastElement = document.querySelector("#daily-forecast");

  let dailyForecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  days.forEach(function (day) {
    dailyForecastHTML =
      dailyForecastHTML +
      `       <div class="col-2">
                <div class="forecast-date">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/04d@2x.png"
                  alt="cloud"
                  width="42"
                />
                <div class="forecast-temp">
                  <span class="min-temp">0°C</span>
                  <span class="max-temp">18°C</span>
                </div>
             </div>`;
  });
  dailyForecastHTML = dailyForecastHTML + `</div>`;
  dailyForecastElement.innerHTML = dailyForecastHTML;
}

function showTemperature(response) {
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
  let idTemperature = document.querySelector("#temp");
  celsiusTemperature = response.data.main.temp;
  idTemperature.innerHTML = Math.round(celsiusTemperature);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getDailyForecast(response.data.coord);
}
function getDailyForecast(coordinates) {
  let apiKey = "f9b144c081d097692afbbd4e19bdc435";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showFahrenheit(event) {
  event.preventDefault();

  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let idTemperature = document.querySelector("#temp");
  idTemperature.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();

  let idTemperature = document.querySelector("#temp");
  idTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

function search(city) {
  let apiKey = "f9b144c081d097692afbbd4e19bdc435";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function okSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar");
  search(city.value);
}

let formSearch = document.querySelector("#search-city");
formSearch.addEventListener("submit", okSubmit);
search("Genève");

function currentPosition(position) {
  let apiKey = "f9b144c081d097692afbbd4e19bdc435";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let locationBtn = document.querySelector("#temp-now");
locationBtn.addEventListener("click", getCurrentLocation);
