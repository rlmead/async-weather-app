// html input
const input_zip = document.getElementById("input_zip");
const input_button = document.getElementById("input_button");

// html output
const city_name = document.getElementById("city_name");
const temperature_kelvin = document.getElementById("temperature_kelvin");
const temperature_fahrenheit = document.getElementById("temperature_fahrenheit");
const temperature_celsius = document.getElementById("temperature_celsius");
const weather_condition = document.getElementById("weather_condition");
const seasonal_pic = document.getElementById("seasonal_pic");

// open weather api url components
const open_weather_url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const open_weather_key = '&appid=fcec01a7089ad8ad44cce9a1071a284c';

// get_weather function to run when zip code is entered
async function get_weather(zip) {
    // pass zip code input to openweather api
    let result = await fetch(open_weather_url + zip + open_weather_key).then((weather_data) => {
        if (weather_data.ok) {
            return weather_data.json();
        } else {
            // throw an error if the URL with the given zip code didn't work
            return Promise.reject('error')
        };
    }).then(weather_json => {
        // parse the returned data and return what's needed for populate_html
        let parsed = {
            "city": weather_json.name,
            "temperature": weather_json.main.temp,
            "condition": weather_json.weather[0].main,
            "icon_code": weather_json.weather[0].icon
        };
        return parsed;
    }).catch(error => {
        // alert user to errors
        alert('something didn\'t work there. please try again!')
    });
    return result;
}

// populate_html function to display weather data
function populate_html(weather_data) {
    // city
    city_name.textContent = weather_data.city;
    // temperature, with conversions
    temperature_kelvin.textContent = Math.round(weather_data.temperature) + 'K';
    temperature_fahrenheit.textContent = Math.round((weather_data.temperature - 273.15) * 9 / 5 + 32) + 'F';
    temperature_celsius.textContent = Math.round(weather_data.temperature - 273.15) + 'C';
    // condition
    weather_condition.textContent = weather_data.condition;
    // icon
}

// add event listener to "get weather" button
input_button.addEventListener("click", async function () {
    // validate zip code input
    if (input_zip.value.match(/^\d{5}$/g)) {
        // run get_weather
        let weather_data = await get_weather(input_zip.value);
        // then populate_html
        populate_html(weather_data);
    } else {
        alert('please enter a valid 5-digit US zip code :)');
    }
})