const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=3cd37936204229cd2134ac8d6ed1463a&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    //console.log(weatherUrl)
    request({
        url: weatherUrl,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Services unabled',undefined)
        } else if (body.error) {
            callback('services error -->' + body.error.info),undefined
        } else {
            callback(undefined,'The temperature of ' + body.location.name+ ' is ' + body.current.temperature + ' degress, and the humidy is ' + 
            body.current.humidity + '%, the feelslike is '+body.current.feelslike+' degrees out.' )
        }
    })

}
module.exports = forecast