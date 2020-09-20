const cityInput = document.querySelector ("#cityInput")
const submitCityButton = document.querySelector("#submitCity")
const cityName = document.querySelector ("#cityName")

let weatherInfo = document.querySelector ("#weatherInfo")

let dates = null
let statusIcons = null
let status = null
let temperature = null
let minTemperature = null
let maxTemperature = null
let windSpeeds = null
let windDirections = null

let firstSearch = false

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let UpdateCityDropdown = async () => 
{
    let response = await fetch(`https://www.metaweather.com/api/location/search/?query=${cityInput.value}`)
    let json = await response.json()

    cityDropdown.innerHTML = '<option>Select</option>\n'
    json.map((city) => 
    {
        cityDropdown.innerHTML += `<option>${city.title}</option>\n`
    })
}

let CheckWeatherForecast = async () => 
{
    if (cityDropdown.value == "Select")
    {
        alert ("Please select a city")
        return
    }

    let response = await fetch(`https://www.metaweather.com/api/location/search/?query=${cityDropdown.value}`)
    let json = await response.json()

    GetCityData(woeid = json[0].woeid)
}

let GetCityData = async (woeid) => 
{
    let response = await fetch(`https://www.metaweather.com/api/location/${woeid}/`)
    let json = await response.json()
    
    if (json.title != json.parent.title)
        cityName.innerHTML = `${json.title} : ${json.location_type} in ${json.parent.title}`
    else
        cityName.innerHTML = `${json.title}`

    if (!firstSearch)
    {
        weatherInfo.innerHTML = ''
        for (let counter = 0; counter < 5; counter++) 
        {
            let date = ''
            if (counter == 0)
                date = "Today"
            else if (counter == 1)
                date = "Tomorrow"

            weatherInfo.innerHTML += `<div class="weatherInfoCard">
                                        <h3 class="date">${date}</h3>
                                        <img class="statusIcon">
                                        <h3 class="status"></h2>
                                        <h3 class="temperature"></h3>
                                        <h3 class="minTemperature"></h3>
                                        <h3 class="maxTemperature"></h3>
                                        <span class="windDirection"></span>
                                        <h3 class="windSpeed"></h3>
                                    </div>`
        }

        dates = document.querySelectorAll(".date")
        statusIcons = document.querySelectorAll(".statusIcon")
        status = document.querySelectorAll(".status")
        temperature = document.querySelectorAll(".temperature")
        minTemperature = document.querySelectorAll(".minTemperature")
        maxTemperature = document.querySelectorAll(".maxTemperature")
        windSpeeds = document.querySelectorAll(".windSpeed")
        windDirections = document.querySelectorAll(".windDirection")

        firstSearch = true; 
    }

    json.consolidated_weather.map ((forecast, index) => 
    {
        if (index <= 4)
        {
            if (index >= 2)
            {
                unformattedDate = forecast.applicable_date
                formattedDateData = unformattedDate.split ("-")
                formattedDateData[1] = parseInt(formattedDateData[1], 10)
                date = new Date(formattedDateData[0], formattedDateData[1] - 1, formattedDateData[2], 0, 0, 0, 0)
                dates[index].innerHTML = weekdays[date.getDay()];
            }

            statusIcons[index].src = `https://www.metaweather.com/static/img/weather/${forecast.weather_state_abbr}.svg`
            status[index].innerHTML = `${forecast.weather_state_name}`
            temperature[index].innerHTML = `${Math.round(forecast.the_temp * 10) / 10}`
            minTemperature [index].innerHTML = `Min: ${Math.round(forecast.min_temp * 10) / 10}`
            maxTemperature [index].innerHTML = `Max: ${Math.round(forecast.max_temp * 10) / 10}`
            windDirections[index].style.transform = `rotate(${forecast.wind_direction}deg)`
            windSpeeds[index].innerHTML = `${Math.round(forecast.wind_speed * 10) / 10} mph`
        }
    })
}

cityInput.addEventListener("change", UpdateCityDropdown);
submitCityButton.addEventListener("click", CheckWeatherForecast);