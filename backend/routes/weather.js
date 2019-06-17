var express = require('express');
var router = express.Router();
const axios = require('axios');

var apixuConfig = require('../configs/apixu-api'); 

var apiKey = apixuConfig.apiKey;

// Getting weather data using the apixu api and axois as request module 
// TODO: If user is authenticated then send his last search results 

router.get('/', function(req, res, next) {
  res.send();
});

router.get('/getCurrentWeather', function(req, res, next){
    let currentWeatherBaseUrl = apixuConfig.currentWeatherBaseUrl + '?key=' + apiKey;
    let query = req.query;

    if(!query['placeToGet']){
        res.send({status: 'Wrong Params'});
        return;
    }

    let placeToGet = query['placeToGet'];
    axios.get(currentWeatherBaseUrl + '&q=' + placeToGet)
        .then(result =>{
            res.send(JSON.stringify(result.data));
            return;
        })
        .catch(error => {
            console.dir(error);
        });
});

router.get('/getForecast', function(req, res, next){
    let forecastBaseUrl = apixuConfig.forecastBaseUrl + '?key=' + apiKey;
    let query = req.query;

    if(!query['placeToGet']){
        res.send({status: 'Wrong Params'});
        return;
    }

    let placeToGet = query['placeToGet'];
    axios.get(forecastBaseUrl + '&q=' + placeToGet + '&days=7')
        .then(result => {
            res.send(JSON.stringify(result.data));
            return;
        })
        .catch(error => {
            console.log(error);
        });
})

router.get('/searchPlace', function(req, res, next){
    let searchPlaceBaseUrl = apixuConfig.searchPlaceBaseUrl + '?key=' + apiKey;
    let query = req.query;

    if(!query['placeToGet']){
        res.send({status: 'Wrong Params'});
        return;
    }

    let placeToGet = query['placeToGet'];
    axios.get(searchPlaceBaseUrl + '&q=' + placeToGet)
        .then(result => {
            console.dir
            res.send(JSON.stringify(result.data));
        })
        .catch(error => {
            console.dir(error);
        });
});

module.exports = router;
