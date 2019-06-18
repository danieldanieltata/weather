var express = require('express');
var router = express.Router();

var userModel = require('../models/users.model');
var selectedDestinationModel = require('../models/selectedDestination.model');

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      next();
  } else {
     res.send({userAuthenticated: false});
  }    
};

// If the user is authenticated then returning his username and a boolean flag
router.get('/', sessionChecker, function(req, res, next) {
  res.send({userAuthenticated: true, name: req.session.user});
});

// Just a login for now 
router.post('/login', function(req, res){  
  
  var username = req.body.username;
  var password = req.body.password;

  userModel.authenticate(username, password, function(callback){
      if(callback.userAuthenticated){ 
        req.session.user = username;

        var fullname = callback.fullName 
        // Adding to reponse if have last searched places in cookie 
        if(req.cookies['last_searched_destinations_' + req.session.user])
          var lastSearchedDestinations = req.cookies['last_searched_destinations_' + req.session.user]

        // Adding to reponse if have selected weather
        selectedDestinationModel.getSelectedDestination(username, function(callback){
            if(callback.found){
              
              var selectedDestination = callback.destinationName;
              
              res.send({ userAuthenticated: true,
                username: username, 
                fullname: fullname, 
                lastSearchedDestinations: lastSearchedDestinations,
                selectedDestination: selectedDestination
              });
              
            }
            else{
                res.send({ userAuthenticated: true,
                  username: username, 
                  fullname: fullname, 
                  lastSearchedDestinations: lastSearchedDestinations
                });
            } 
        });

      }
      else res.send({ userAuthenticated: false});
  });

});

router.post('/signup', function(req, res){

    var username = req.body.username;
    var fullname = req.body.fullname;
    var password = req.body.password;

    // Just validating if user is exists if not making a new one 
    userModel.validateUser(username, function(callback){
        if(callback.userValid){
            let newUser = new userModel({username: username, fullname: fullname, password: password});
            newUser.save()
                   .then(() => {
                      res.send({userSignup: true, username: username, fullName: fullname});
                   });
        }
        else res.send({userSignup: false});
    });

});

router.get('/logout', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.send({userLoggedOut: true});
    }
})

module.exports = router;
