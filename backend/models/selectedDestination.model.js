var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var selectedDestination = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    destinationName: {type: String, required: true}
});

selectedDestination.statics.updateIfSelectedIfExists = function(username, destinationName, callback){
    this.findOne({username: username}, function(err, docSelectedDest){
            if(err || !docSelectedDest) callback({exists: false});
            else{
                docSelectedDest.destinationName = destinationName;
                docSelectedDest.save()
                            .then(() => {
                                callback({exists: true, updated: true});
                            });
            }
    });
}

selectedDestination.statics.getSelectedDestination = function(username, callback){
    this.findOne({username: username}, function(err, docSelectedDest){
        if(err || !docSelectedDest) callback({found: false});
        else callback({found: true, destinationName: docSelectedDest.destinationName});
    })
}

module.exports = mongoose.model('SelectedDestination', selectedDestination);;
