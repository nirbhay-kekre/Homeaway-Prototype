const { prepareInternalServerError, prepareSuccess } = require('./responses')
const { Property } = require('./../models/property');

async function handle_request(req, callback) {
    let resp = {}
    try {
        let searchCriteria = createSearchCriteriaHistoryObject(req);

        let properties = await Property.find(...searchCriteria);
        resp = prepareSuccess({
            properties
            // results: properties.docs,
            // total: properties.total,
            // limit: properties.limit,
            // offset: properties.offset,
            // page: properties.page,
            // pages: properties.pages
        });
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

createSearchCriteriaHistoryObject = (req) => {
    const filter = {};
    // let page, limit;
    // if (req.pagination) {
    //     let pagination = JSON.parse(req.pagination);
    //     page = pagination.page;
    //     limit = pagination.limit;
    // }
    // const options = {
    //     page: parseInt(page, 10) || 1,
    //     limit: parseInt(limit, 10) || 10
    // }
    if (req.filters) {
        let { city, headline } = JSON.parse(req.filters);
        if (city) filter.city = { $regex: ".*" + city + ".*" };
        if(headline) filter.headline = { $regex: ".*" + headline + ".*" };
    }
    if("owner" === req.historyFor){
        //check owner name with username
        filter.owner = req.username
        if(req.sold){ 
            //sold properties
            filter.history =  {$exists : true, $ne: []}
        }
    } else {
        // history with buyer name as username
        filter.history =  {$exists : true, $ne: [], $elemMatch: { buyer: req.username } };
    }
    //const searchCriteria = [filter, options];
    const searchCriteria = [filter];
    console.log("Searching properties history with search criteria:", JSON.stringify(searchCriteria));
    return searchCriteria;
}


exports.handle_request = handle_request;