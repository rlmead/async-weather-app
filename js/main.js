// define consts for html input
const input_zip = document.getElementById("input_zip");
const input_button = document.getElementById("input_button");

// define consts for html output
const city_name = document.getElementById("city_name");
const temperature_kelvin = document.getElementById("temperature_kelvin");
const temperature_fahrenheit = document.getElementById("temperature_fahrenheit");
const temperature_celsius = document.getElementById("temperature_celsius");
const weather_condition = document.getElementById("weather_condition");
const seasonal_pic = document.getElementById("seasonal_pic");

// get_weather function to run when button is pressed
let get_weather = function (z) {
    // pass zip code input to openweather api
    fetch('https://api.openweathermap.org/data/2.5/weather?zip='+z+'&appid=fcec01a7089ad8ad44cce9a1071a284c').then((weather_data) => {
        if (weather_data.ok) {
            return weather_data.json();
        } else {
            // throw an error if the URL with the given zip code didn't work
            return Promise.reject('error')
        };
    }).then((weather_json) => {
        // parse the returned data for city, temperature, condition, icon code
        // return the data that will be passed to populate_html
        let output = {"city": weather_json.name, "temperature": weather_json.main.temp, "condition": weather_json.weather.main, "icon_code": weather_json.icon};
        return output;
    }).catch((error) => {
        // alert user to errors
        alert('something didn\'t work there. please try again!')
    });
}

// populate_html function to populate index.html with weather data
    // input = output from get_weather
    // convert temperature into all three of k/f/c
    // populate html elements with the relevant data

// add event listener to "get weather" button
input_button.addEventListener("click", function () {
    // run get_weather as promise using fetch()
    let weather_data = get_weather(input_zip.value); // ! doesn't appear to be working
    console.log(weather_data);
    // then populate_html
    // should this have some sort of timeout handling? does that happen automatically with promises?
})