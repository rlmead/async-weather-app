// define consts for html elements that will be updated:
let city_name = document.getElementById(city_name);
let temperature_kelvin = document.getElementById(temperature_kelvin);
let temperature_fahrenheit = document.getElementById(temperature_fahrenheit);
let temperature_celsius = document.getElementById(temperature_celsius);
let weather_condition = document.getElementById(weather_condition);
let seasonal_pic = document.getElementById(seasonal_pic);

// get_weather function to run when "get weather" button is pressed
    // retrieve zip code from input (handling errors elegantly)
    // pass zip code to openweather api
        // docs here: https://openweathermap.org/current#zip
    // parse the returned data for: city, temperature, condition, season
    // return the data that will be passed to populate_html

// populate_html function to populate index.html with weather data
    // input = output from get_weather
    // convert temperature into all three of k/f/c
    // populate html elements with the relevant data

// add eventlistener to "get weather" button - i believe this will have to have some asynchronicity!
    // run get_weather as promise
    // then populate_html
    // should this have some sort of timeout handling? does that happen automatically with promises?