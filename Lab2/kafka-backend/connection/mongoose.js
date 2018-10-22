var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:nirbhay123@ds045557.mlab.com:45557/homeaway_nirbhay');

module.exports = {mongoose};