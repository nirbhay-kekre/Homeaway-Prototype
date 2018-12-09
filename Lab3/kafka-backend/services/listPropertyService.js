const { prepareInternalServerError, prepareSuccess } = require('./responses')
const { Property } = require('./../models/property');
let DateDiff = require("date-diff");

async function handle_request(req, callback) {
    let resp = {}
    try {
        let searchCriteria = createSearchCriteriaObject(req);

        let properties = await Property.paginate(...searchCriteria);
        resp = prepareSuccess({
            results: properties.docs,
            total: properties.total,
            limit: properties.limit,
            offset: properties.offset,
            page: properties.page,
            pages: properties.pages
        });
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

createSearchCriteriaObject = (req) => {
    const filter = {};
    let page, limit;
    if (req.pagination) {
        let pagination = JSON.parse(req.pagination);
        page = pagination.page;
        limit = pagination.limit;
    }
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10
    }
    if (req.filters) {
        let { accomodates, oneNightRate, bedroom, bathroom, amenity, sorting, city, arrivalDate, departureDate } = JSON.parse(req.filters);
        if (accomodates && accomodates.min) filter.accomodates = { $gte: accomodates.min };
        if (oneNightRate && oneNightRate.min && oneNightRate.max) filter.oneNightRate = { $gte: oneNightRate.min, $lte: oneNightRate.max };
        else if (oneNightRate && oneNightRate.min) filter.oneNightRate = { $gte: oneNightRate.min };
        else if (oneNightRate && oneNightRate.max) filter.oneNightRate = { $lte: oneNightRate.max };
        if (bedroom && bedroom.min) filter.bedroom = { $gte: bedroom.min };
        if (bathroom && bathroom.min) filter.bathroom = { $gte: bathroom.min };
        if (amenity && amenity.length > 0) filter.amenities = { $in: amenity };
        if (city) filter.city = { $regex: ".*" + city + ".*" };
        if (arrivalDate && departureDate) {
            filter.availability = { $elemMatch: { endDate: { $gte: (new Date(departureDate)).toISOString() }, startDate: { $lte: (new Date(arrivalDate)).toISOString() } } }
            let numOfOnboardingDays = 1;
            if (new Date(departureDate) > new Date(arrivalDate)) {
                let dateDiff = new DateDiff(new Date(departureDate), new Date(arrivalDate));
                numOfOnboardingDays = dateDiff.days() + 1;
            }
            filter.minNightStay = { $lte: numOfOnboardingDays }
        }
        else if (arrivalDate) filter.availability = { $elemMatch: { startDate: { $lte: (new Date(arrivalDate)).toISOString() } } };
        else if (departureDate) filter.availability = { $elemMatch: { endDate: { $gte: (new Date(departureDate)).toISOString() } } };

        if (sorting && sorting.sortCriteria) {
            if (sorting.sortOrder) {
                options.sort = {
                    [sorting.sortCriteria]: sorting.sortOrder
                };

            } else {
                options.sort = {
                    [sorting.sortCriteria]: 1
                };
            }
        }
    }

    const searchCriteria = [filter, options];
    console.log("Searching properties with search criteria:", JSON.stringify(searchCriteria));
    return searchCriteria;
}


exports.handle_request = handle_request;