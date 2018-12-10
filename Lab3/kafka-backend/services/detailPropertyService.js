const { prepareInternalServerError, prepareSuccess, prepareNoContent } = require('./responses')
const { Property } = require('./../models/property');
let DateDiff = require("date-diff");

async function handle_request(req, callback) {
    let resp = {}
    try {
        let { propertyId, arrivalDate, departureDate, accomodates } = req
        arrivalDate = arrivalDate ? new Date(arrivalDate) : new Date();
        departureDate = departureDate ? new Date(departureDate) : new Date();
        accomodates = accomodates || 1;
        let numOfOnboardingDays = 1;
        if (departureDate > arrivalDate) {
            let dateDiff = new DateDiff(departureDate, arrivalDate);
            numOfOnboardingDays = dateDiff.days() + 1;
        }
        
        let searchCriteria = createSearchCriteria(propertyId, arrivalDate.toISOString(), departureDate.toISOString(), accomodates, numOfOnboardingDays);
        arrivalDate = formatDate(arrivalDate);
        departureDate = formatDate(departureDate);
        let property = await Property.findOne(searchCriteria);
        if (property) {
            resp = prepareSuccess({
                    ...property._doc,
                    guests: accomodates,
                    arrivalDate: arrivalDate,
                    departureDate: departureDate,
                    totalPrice: (property._doc.oneNightRate * numOfOnboardingDays).toFixed(2)
            });
        }
        else {
            resp = prepareNoContent({
                result: {},
                detail: "Property is no longer available"
            });
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}
createSearchCriteria = (propertyId, arrivalDate, departureDate, accomodates, numOfOnboardingDays) => {

    const searchCriteria = {
        propertyId
    }
    console.log("Detail search criteria: ", JSON.stringify(searchCriteria))
    return searchCriteria;
}

function formatDate(date) {
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

exports.handle_request = handle_request;