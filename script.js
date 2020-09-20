// const cityInput = document.getElementById ("cityInput")
// const submitCityButton = document.getElementById("submitCity")
// const cityInfo = document.getElementById ("cityInfo")

const cityInput = document.querySelector ("#cityInput")
const submitCityButton = document.querySelector("#submitCity")
const cityInfo = document.querySelector ("#cityInfo")

const dates = document.querySelectorAll (".date")
const statusIcons = document.querySelectorAll (".statusIcon")
const status = document.querySelectorAll (".status")
const temperature = document.querySelectorAll (".temperature")
const minTemperature = document.querySelectorAll (".minTemperature")
const maxTemperature = document.querySelectorAll (".maxTemperature")

let UpdateCityDropdown = async () => 
{
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${cityInput.value}`)
    let json = await response.json()

    cityDropdown.innerHTML = '<option>Select</option>\n'
    json.map((city) => 
    {
        cityDropdown.innerHTML += `<option>${city.title}</option>\n`
    })
}

let CheckWeatherForecast = async () => 
{
    if (cityDropdown.value == "None")
    {
        alert ("Please select a city")
        return
    }

    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${cityDropdown.value}`)
    let json = await response.json()

    console.log (json[0].woeid)

    GetCityData(woeid = json[0].woeid)
}

let GetCityData = async (woeid) => 
{
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    let json = await response.json()
    
    if (json.title != json.parent.title)
        cityInfo.style.textContent = `${json.title} ${json.location_type} in ${json.parent.title}`
    else
        cityInfo.style.textContent = `${json.title}`

    json.consolidated_weather.map ((forecast, index) => 
    {
        if (index <= 4)
        {
            if (index >= 2)
                dates[index].innerHTML = `${forecast.applicable_date}`
            
            statusIcons[index].src = `https://www.metaweather.com/static/img/weather/png/64/${forecast.weather_state_abbr}.png`
            status[index].innerHTML = `${forecast.weather_state_name}`
            temperature[index].innerHTML = `${Math.round(forecast.the_temp * 10) / 10}`
            minTemperature [index].innerHTML = `Min: ${Mathf.round(forecast.min_temp * 10) / 10}`
            maxTemperature [index].innerHTML = `Max: ${Mathf.round(forecast.max_temp * 10) / 10}`
        }
    })
}

cityInput.addEventListener("change", UpdateCityDropdown);
submitCityButton.addEventListener("click", CheckWeatherForecast);














// let value = document.getElementById ("value")
// let exchangeFrom = document.getElementById ("exchangeFrom")
// let exchangeTo = document.getElementById ("exchangeTo")
// let displaySelected = document.getElementById ("displaySelection")
// let displayAll = document.getElementById ("displayAll")

// let GetCurrancyData = async (currencyFrom, currency, currencyTo) => {
//     let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`)
//     let json = await response.json()
    
//     displaySelected.innerHTML = ''
//     displaySelected.innerHTML = `<h1>${currencyTo}: ${Math.floor(json.rates[currencyTo] * currency * 100) / 100}</h1>`
    
//     let ratesArray = Object.entries (json.rates) // Convert json.rates dictionary into array
    
//     displayAll.innerHTML = ''
//     ratesArray.map((object) => {
//         if (object[0] != currencyFrom && object[0] != currencyTo)
//         displayAll.innerHTML += `<p>${object[0]} : ${Math.floor(object[1] * currency * 100) / 100}</p>\n`
//     })
// }

// let UpdateData = () => {
//     currency = value.value
//     currencyFrom = exchangeFrom.options[exchangeFrom.selectedIndex].value
//     currencyTo = exchangeTo.options[exchangeTo.selectedIndex].value
//     GetCurrancyData(currencyFrom, currency, currencyTo)
// }

// exchangeFrom.addEventListener("change", UpdateData)
// value.addEventListener("change", UpdateData)
// exchangeTo.addEventListener("change", UpdateData)