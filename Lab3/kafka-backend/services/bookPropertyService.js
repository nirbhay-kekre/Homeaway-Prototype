const { prepareInternalServerError, prepareSuccess } = require('./responses')
const { Property } = require('./../models/property');
let DateDiff = require("date-diff");

async function handle_request(req, callback) {
    let resp = {}
    try {
        let { propertyId, arrivalDate, departureDate, guests, buyer, amountPaid } = req
        arrivalDate = arrivalDate ? new Date(arrivalDate) : new Date();
        departureDate = departureDate ? new Date(departureDate) : new Date();
        guests = guests || 1;
        let numOfOnboardingDays = 1;
        if (departureDate > arrivalDate) {
            let dateDiff = new DateDiff(departureDate, arrivalDate);
            numOfOnboardingDays = dateDiff.days() + 1;
        }

        let searchCriteria = searchCriteriaProperty(propertyId, arrivalDate.toISOString(), departureDate.toISOString(), guests, numOfOnboardingDays);
        let property = await Property.findOne(searchCriteria);

        if (property) {
            let updatedAvailabilily = [];
            for (i = 0; i < property._doc.availability.length; i++) {
                let current = property._doc.availability[i];
                let arrival = arrivalDate.toISOString();
                let departure = departureDate.toISOString();
                if (current.startDate <= arrival && arrival <= current.endDate &&
                    current.startDate <= departure && departure <= current.endDate) {
                    let dayBeforeArrival = new Date(arrivalDate.toISOString());//cloning
                    dayBeforeArrival.setDate(dayBeforeArrival.getDate() - 1);
                    dayBeforeArrival = (current.startDate >= dayBeforeArrival.toISOString()) ? current.startDate : dayBeforeArrival.toISOString();

                    let dayAfterDeparture = new Date(departure);//cloning
                    dayAfterDeparture.setDate(dayAfterDeparture.getDate() + 1);
                    dayAfterDeparture = (current.endDate <= dayAfterDeparture.toISOString()) ? current.endDate : dayAfterDeparture.toISOString();
                    if (current.startDate !== dayBeforeArrival) {
                        updatedAvailabilily.push({
                            startDate: current.startDate,
                            endDate: dayBeforeArrival
                        });
                    }
                    if (dayAfterDeparture !== current.endDate) {
                        updatedAvailabilily.push({
                            startDate: dayAfterDeparture,
                            endDate: current.endDate
                        });
                    }
                } else {
                    updatedAvailabilily.push(current);
                }
            }
            let updatedHistory = property._doc.history ? property._doc.history : [];
            updatedHistory.push({
                guests,
                buyer,
                arrivalDate: arrivalDate.toISOString(),
                departureDate: departureDate.toISOString(),
                amountPaid
            });
            let updatedprop = await Property.findOneAndUpdate({ propertyId: propertyId },
                {
                    availability: updatedAvailabilily,
                    history: updatedHistory
                }, { new: true });

            resp = prepareSuccess({
                success: true,
                message: "Booking Success"
            });
        }
        else {
            resp = prepareSuccess({
                success: false,
                message: "Property is not available on dates you are looking for. For better experience search properties with proper filters"
            });
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}
searchCriteriaProperty = (propertyId, arrivalDate, departureDate, guests, numOfOnboardingDays) => {

    const searchCriteria = {
        propertyId,
        availability: {
            $elemMatch: {
                endDate: { $gte: departureDate },
                startDate: { $lte: arrivalDate }
            }
        },
        minNightStay: {
            $lte: numOfOnboardingDays
        },
        accomodates: {
            $gte: guests
        }
    }
    console.log("Detail search criteria: ", JSON.stringify(searchCriteria))
    return searchCriteria;
}

function formatDate(date) {
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

exports.handle_request = handle_request;