const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const bookingHistory = new Schema({
        propertyId: String,
        guests: Number,
        owner: String,
        buyer: String,
        arrivalDate: String,
        departureDate: String,
        amountPaid: Number
});
bookingHistory.plugin(mongoosePaginate);

const Booking = mongoose.model('bookingHistory', bookingHistory);
module.exports = { Booking };
