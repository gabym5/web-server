const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoiZ2FieW1vciIsImEiOiJja240dXV4aGUwNmVuMm5wODI2Z21ieXE0In0.Ldex_FR6jKBsQkuhC7y8BQ'
    
    request({ url:geocodeURL, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to services', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find the location', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode