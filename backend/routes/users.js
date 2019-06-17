var express = require('express');
var router = express.Router();

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      next();
  } else {
      res.send('da');
  }    
};

/* GET users listing. */
router.get('/', sessionChecker, function(req, res, next) {
  res.send({});
});

router.post('/login', function(req, res){
  var users = {username: 'daniel', password: 'pass'};
  
  var username = req.query.username;
  var password = req.query.password;

  if(username == users.username)
    req.session.user = username;
    res.send({loggedIn: true});  
  console.log(username);
})

module.exports = router;
