const request = require('postman-request')

const weather_api_url = 'http://api.weatherstack.com/'
const weather_access_key = 'a9e486151d5ab3cd620eccd2132a7a42'

const Weather = (latitut, longitut, callback) => {

    const url_weather = weather_api_url + 'current?' 
                + 'access_key=' + weather_access_key 
                + '&query=' + latitut + ',' + longitut
    
    request({url: url_weather, json:true}, (error, response)=>{
        if(error){
            callback('Unable to fetch weather data!', undefined)
        }else if(response.body.current === undefined){
            callback('There is no weather data for this location!', undefined)
        }else{
            const {temperature, humidity, feelslike, weather_icons:icon, pressure, cloudcover } = response.body.current
            callback(error,{temperature, humidity, feelslike, icon,pressure, cloudcover })
        }
    })
}

module.exports = Weather