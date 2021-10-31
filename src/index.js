let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  `0${hour}`;
} else {
  hour;
}

let minute = now.getMinutes();
if (minute < 10) {
  `0${minute}`;
} else {
  minute;
}

let header = document.querySelector("#current-time");
header.innerHTML = `${day} ${hour}:${minute}`;

function selectCity(event) {
  {
    event.preventDefault();
    let apiKey = "49cb7b6601adf66f3ce54eb040e3a0ba";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    let input = document.querySelector("#city-input");
    let city = document.querySelector("#current-city");
    city.innerHTML = input.value;
    axios
      .get(`${apiUrl}${input.value}&units=metric&appid=${apiKey}`)
      .then(showTemperature);
  }

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#current-temp");
    temperatureElement.innerHTML = `${temperature}°C`;
  }
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", selectCity);

function currentLocationTemp() {
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "49cb7b6601adf66f3ce54eb040e3a0ba";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let location = document.querySelector("#current-city");
    location.innerHTML = `Latitude: ${latitude} Longitude: ${longitude}`;
    axios
      .get(
        `${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      )
      .then(showTemperature);
  }
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#current-temp");
    temperatureElement.innerHTML = `${temperature}°C`;
  }
}

let cityButton = document.querySelector("#current-location-button");
cityButton.addEventListener("click", currentLocationTemp);
