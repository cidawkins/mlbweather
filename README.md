# mlbweather
Retrieve hourly forecasts for active MLB venues

## Weather Underground
This library depends on forecast data from the Weather Underground.  You will need to produce your own API Key in order to run this.  Keys can be obtained at http://www.wunderground.com/weather/api

## Install
```
npm install mlbweather
```

## Usage
```
const Mlbweather = require('mlbweather');

const options = {
  key: 'wundergroundkey'
};

const mlbweather = new Mlbweather(options);
mlbweather.get(function (err, results) {
  
  //... do something
});
```
