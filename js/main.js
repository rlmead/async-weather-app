// html input
const input_zip = document.getElementById("input_zip");
const input_button = document.getElementById("input_button");

// html output
const output_container = document.getElementById("output_container");
const city_name = document.getElementById("city_name");
const temperature_kelvin = document.getElementById("temperature_kelvin");
const temperature_fahrenheit = document.getElementById("temperature_fahrenheit");
const temperature_celsius = document.getElementById("temperature_celsius");
const weather_condition = document.getElementById("weather_condition");
const weather_icon = document.getElementById("weather_icon");
const seasonal_pic = document.getElementById("seasonal_pic");

// open weather api url components
const open_weather_url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const open_weather_key = '&appid=fcec01a7089ad8ad44cce9a1071a284c';

// get_weather function to run when zip code is entered
async function get_weather(zip) {
    // pass zip code input to openweather api
    let result = await fetch(`${open_weather_url}${zip}${open_weather_key}`).then((weather_data) => {
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
            "icon_code": weather_json.weather[0].icon,
            "latitude": weather_json.coord.lat
        };
        return parsed;
    }).catch(error => {
        // alert user to errors
        alert('something didn\'t work there. please try again!')
    });
    return result;
}

let pic_links = [
    "https://images.unsplash.com/photo-1482597869166-609e91429f40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1577878668405-f678c7bb05ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580223517284-817869c49adb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=823&q=80",
    "https://images.unsplash.com/photo-1540631162967-821f368288eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
]

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
    weather_icon.setAttribute("src", `https://openweathermap.org/img/w/${weather_data.icon_code}.png`)
    // seasonal pic
    let current_month = new Date().getMonth();
    if (weather_data < 0) {
        // adjust pic_links index for southern hemisphere
        current_month < 6 ? current_month += 6 : current_month -= 6;
    }
    seasonal_pic.setAttribute("src", pic_links[Math.floor(current_month / 3) % 4]);
}

// one function to rule them all
async function run() {
    // validate zip code input
    if (input_zip.value.match(/^\d{5}$/g)) {
        // run get_weather
        let weather_data = await get_weather(input_zip.value);
        // then populate_html
        populate_html(weather_data);
        output_container.classList.remove("d-none");
    } else {
        alert('please enter a valid 5-digit US zip code :)');
    }
}

// focus the input box upon loading
input_zip.focus();

// add event listener to "get weather" button
input_button.addEventListener("click", run);

// add event listener for key-press to trigger "get weather" button-click
document.addEventListener("keyup", event => {
    // check if key === enter/return
    if (event.keyCode === 13) {
        // prevent other default actions from happening
        event.preventDefault();
        // pretend that the input button got clicked
        input_button.click();
    }
});