var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var userSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    fullname: {type: String, required: true},
    password: {type: String, required: true}
});



// userSchema.statics.signupUser = function(username, password){
//     var newUser = new userModel({username: username, password: password});

//     newUser.save();
// }

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
