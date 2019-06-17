var express = require('express');
var router = express.Router();
const axios = require('axios');

var apixuConfig = require('../configs/apixu-api'); 

var apiKey = apixuConfig.apiKey;

router.get('/', function(req, res, next) {
  res.send();
});

// Giving the current weather for the client 
router.get('/getCurrentWeather', function(req, res, next){
    let currentWeatherBaseUrl = apixuConfig.currentWeatherBaseUrl + '?key=' + apiKey;
    let query = req.query;

    if(!query['placeToGet']){
        res.send({status: 'Wrong Params'});
    }

    let placeToGet = query['placeToGet'];
    axios.get(currentWeatherBaseUrl + '&q=' + placeToGet)
        .then(result =>{
            res.send(JSON.stringify(result.data));
        })
        .catch(error => {
            console.dir(error);
        });
});

// Giving the forecast for the client 
router.get('/getForecast', function(req, res, next){
    let forecastBaseUrl = apixuConfig.forecastBaseUrl + '?key=' + apiKey;
    let query = req.query;

    if(!query['placeToGet']){
        res.send({status: 'Wrong Params'});
        return;
    }

    let placeToGet = query['placeToGet'];

    // Checking if can write to the use a cookie with his last visited destination's
    if (req.session.user && req.cookies.user_sid) {
        if(req.cookies.last_searched_destinations){

            // Storing only 3 last places, manages here
            let lastSearchedDestinations = req.cookies.last_searched_destinations;
            if(lastSearchedDestinations.includes(placeToGet)){
                res.cookie('last_searched_destinations', lastSearchedDestinations);
            }
            else if(lastSearchedDestinations.length >= 3){
                lastSearchedDestinations.shift();
                lastSearchedDestinations.push(placeToGet);
                res.cookie('last_searched_destinations', lastSearchedDestinations);
            }
            else{
                lastSearchedDestinations.push(placeToGet);
                res.cookie('last_searched_destinations', lastSearchedDestinations);
            }

        }
        else res.cookie('last_searched_destinations', [placeToGet]);
    }

    // Doing an http request to get the place that the cline wants 
    axios.get(forecastBaseUrl + '&q=' + placeToGet + '&days=7')
        .then(result => {
            res.send(JSON.stringify(result.data));
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
    }

    let placeToGet = query['placeToGet'];

    // Doing http request to chekc if their is some kind of the client sent string 
    axios.get(searchPlaceBaseUrl + '&q=' + placeToGet)
        .then(result => {
            res.send(JSON.stringify(result.data.slice(0, 5)));
        })
        .catch(error => {
            console.dir(error);
        });
});

module.exports = router;
