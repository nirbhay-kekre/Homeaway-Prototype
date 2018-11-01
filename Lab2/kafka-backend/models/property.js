
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const propertySchema = new Schema({
        propertyId: String,
        headline: String,
        propertyType: String,
        bedroom: Number,
        bathroom: Number,
        accomodates: Number,
        street: String,
        city: String,
        state: String,
        zip: Number,
        country: String,
        oneNightRate: Number,
        amenities: [String],
        photoUrl: [String],
        owner: String,
        propertyDescription: String,
        bookingOption: String,
        minNightStay: Number,
        availability: [{
            startDate: String,
            endDate: String
        }],
        history:[
            {
                propertyId: String,
                guests: Number,
                buyer: String,
                arrivalDate: String,
                departureDate: String,
                amountPaid: Number
            }
        ]
});
propertySchema.plugin(mongoosePaginate);

const Property = mongoose.model('properties', propertySchema);
module.exports = { Property };
