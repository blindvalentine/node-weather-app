const request = require('request');

const getForecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/835662b33f3074f0193fa034867a42c6/' + latitude + ',' + longitude + '?units=si'
  request({url, json:true}, (error, {body})=>{
    if (error){
      callback("unable to get weather forecast.", undefined);
    }else if (body.error) {
      callback('Unable to find location.', undefined);
    }else{
      callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees. There is " + body.currently.precipProbability + "% chance of rain.");
    }
  })
}

module.exports = getForecast;
