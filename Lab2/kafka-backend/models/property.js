
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const propertySchema = new Schema({
        propertyId: Number,
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
        }]
});
propertySchema.plugin(mongoosePaginate);

const Property = mongoose.model('properties', propertySchema);
module.exports = { Property };
