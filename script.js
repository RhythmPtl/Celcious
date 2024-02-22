const apiKey = '17da39df5f4d4c7dbff192957242901';
const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location-input');
const currentWeatherInfo = document.getElementById('current-weather-info');
const forecastInfo = document.getElementById('forecast-info');
const currentLocationBtn = document.getElementById('current-location-btn'); // New

// Event listeners
searchBtn.addEventListener('click', searchByLocation);
currentLocationBtn.addEventListener('click', getCurrentLocation); // New

function searchByLocation() {
    const location = locationInput.value;
    getCurrentWeather(location);
    getForecast(location);
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
    .then(response => response.json())
    .then(data => {
        const location = `${data.location.name}, ${data.location.country}`;
        const { temp_c, condition } = data.current;
        currentWeatherInfo.innerHTML = `<p>Location: ${location}</p><p>Temperature: ${temp_c}°C</p><p>Condition: ${condition.text}</p>`;
    })
    .catch(error => console.log(error));
}

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}`)
    .then(response => response.json())
    .then(data => {
        const location = `${data.location.name}, ${data.location.country}`;
        const { temp_c, condition } = data.current;
        currentWeatherInfo.innerHTML = `<p>Location: ${location}</p><p>Temperature: ${temp_c}°C</p><p>Condition: ${condition.text}</p>`;
    })
    .catch(error => console.log(error));
}






function errorCallback(error) {
    console.error('Error getting geolocation:', error);
}

function getCurrentWeather(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
    .then(response => response.json())
    .then(data => {
        const { temp_c, condition } = data.current;
        currentWeatherInfo.innerHTML = `<p>Temperature: ${temp_c}°C</p><p>Condition: ${condition.text}</p>`;
    })
    .catch(error => console.log(error));
}

function getForecast(location) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`)
    .then(response => response.json())
    .then(data => {
        const forecastDays = data.forecast.forecastday;
        forecastInfo.innerHTML = '';
        forecastDays.forEach(day => {
            const { date, day: { maxtemp_c, mintemp_c, condition } } = day;
            forecastInfo.innerHTML += `<div><p>Date: ${date}</p><p>Max Temp: ${maxtemp_c}°C</p><p>Min Temp: ${mintemp_c}°C</p><p>Condition: ${condition.text}</p></div>`;
        });
    })
    .catch(error => console.log(error));
}

