const request = require('postman-request')

const position_api_url = 'http://api.positionstack.com/v1/'
const position_access_key = '4937988a4737aa35a255dfcf75710743'

const GeoCode = (address, callback) => {
    
    const position_url = position_api_url+'forward?access_key='
                        +position_access_key+'&query='+encodeURIComponent(address)

    request({url: position_url, json:true}, (error, response)=>{
        if (error){
            callback('Unable to connect to location services!', undefined)
        }else if (response.body.data.length === 0){
            callback('unable to find location. Try another one.', undefined)
        }else {
            const {latitude, longitude} = response.body.data[0]
            callback(undefined,{latitude, longitude})
        }        
    })    
}

module.exports = GeoCode