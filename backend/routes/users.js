var express = require('express');
var router = express.Router();

var userModel = require('../models/users.model');

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

        if(req.cookies.last_searched_destinations)
          var lastSearchedDestinations = req.cookies.last_searched_destinations

        res.send({ userAuthenticated: true, username: username, fullname: callback.fullName, lastSearchedDestinations: lastSearchedDestinations});
      }
      else res.send({ userAuthenticated: false});
  });

})

module.exports = router;
