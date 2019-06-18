var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var userSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    fullname: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.statics.validateUser = function(username, callback){
    this.findOne({username: username}, function(err, userDoc){
        if(err) callback({userValid: false});

        if(!userDoc) callback({userValid: true});
        else callback({userValid: false});
    })
}

userSchema.statics.authenticate = function(username, password, callback){
    this.findOne({username: username}, function(err, userDoc){
        
        if(err || !userDoc) callback({userAuthenticated: false});
        else{
            if(userDoc.password == password) callback({userAuthenticated: true, fullName: userDoc.fullname});
            else callback({userAuthenticated: false});
        }

    });
}

module.exports = mongoose.model('User', userSchema);;
