const request = require('request')

const geoCode = (cityName, callback) => {
    const units ='metric';
    const apiKey = '12767781338d2c1227fe3a82e47b5e4f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=`+ encodeURIComponent(cityName)+`&appid=${apiKey}&units=${units}`;

    
    request({ url, json:true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined) //Callback with an error message
        } else if (body.name === false) {
            callback('Try another search!', undefined) //Callback with an error message
        } else {
            callback(undefined, {
                latitude : body.coord.lat,
                longitude : body.coord.lon,
                location : body.name
            }) //Callback with the weather data
        }
    })
}

module.exports=geoCode