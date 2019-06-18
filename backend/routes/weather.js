var express = require('express');
var router = express.Router();
const axios = require('axios');

var selectedDestinationModel = require('../models/selectedDestination.model');

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
    }

    let placeToGet = query['placeToGet'];

    // Checking if can write to the use a cookie with his last visited destination's
    if (req.session.user && req.cookies.user_sid) {
        if(req.cookies['last_searched_destinations_' + req.session.user]){

            // Storing only 3 last places, manages here
            let lastSearchedDestinations = req.cookies['last_searched_destinations_' + req.session.user];
            if(lastSearchedDestinations.includes(placeToGet)){
                res.cookie('last_searched_destinations_' + req.session.user, lastSearchedDestinations);
            }
            else if(lastSearchedDestinations.length >= 3){
                lastSearchedDestinations.shift();
                lastSearchedDestinations.push(placeToGet);
                res.cookie('last_searched_destinations_' + req.session.user, lastSearchedDestinations);
            }
            else{
                lastSearchedDestinations.push(placeToGet);
                res.cookie('last_searched_destinations_' + req.session.user, lastSearchedDestinations);
            }

        }
        else res.cookie('last_searched_destinations_' + req.session.user, [placeToGet]);
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

router.post('/makeSelectedDestination', function(req, res){
    if (!req.session.user || !req.cookies.user_sid) res.send('User is not authenticated');

    let username = req.session.user;
    let destinationToSelect = req.body.placeToMark;

    // Checking if user exists in DB if yes updating he's selected place
    selectedDestinationModel.updateIfSelectedIfExists(username, destinationToSelect, function(callback){
            if(callback.exists, callback.updated) res.send({isMakeSelected: true});
            else{
                let newSelected = new selectedDestinationModel({username: username, destinationName: destinationToSelect});
                newSelected.save()
                           .then(() => {
                                res.send({isMakeSelected: true})
                           })
            }
    });
});

module.exports = router;
