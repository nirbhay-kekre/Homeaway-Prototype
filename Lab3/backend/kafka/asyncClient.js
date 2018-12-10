var rpc = require('./kafkarpc');
const rpcConnections = {}

//make request to kafka
function make_request(req_queue_name, resp_queue_name, msg_payload, callback) {
    if (rpcConnections[req_queue_name + "_" + resp_queue_name] === undefined) {
        rpcConnections[req_queue_name + "_" + resp_queue_name] = new rpc();
    }
    console.log('in make request');
    console.log(msg_payload);
    return new Promise((resolve, reject) => {
        rpcConnections[req_queue_name + "_" + resp_queue_name].makeRequest(req_queue_name, resp_queue_name, msg_payload, function (err, response) {
            let responseFromCallback = null;
            if (err) {
                console.error(err);
                responseFromCallback = callback(err, null);
            } else {
                console.log("response", response);
                responseFromCallback = callback(null, response);
            }
            resolve(responseFromCallback);
        });
    });
}

exports.make_request = make_request;