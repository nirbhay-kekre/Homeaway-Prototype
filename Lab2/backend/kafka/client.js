var rpc = require('./kafkarpc');

const rpcConnections ={}
const { byPassKafka } = require("./../config/adapter");
//make request to kafka
function make_request(req_queue_name, resp_queue_name, msg_payload, callback) {
	// if(rpcConnections[req_queue_name+"_"+resp_queue_name] === undefined){
	// 	rpcConnections[req_queue_name+"_"+resp_queue_name] = new rpc() ;
	// }
	// console.log('in make request');
	// console.log(msg_payload);
	// rpcConnections[req_queue_name+"_"+resp_queue_name].makeRequest(req_queue_name, resp_queue_name, msg_payload, function (err, response) {

	// 	if (err) {
	// 		console.error(err);
	// 		callback(err, null);
	// 	} else {
	// 		console.log("response", response);
	// 		callback(null, response);
	// 	}
	// });
	byPassKafka(req_queue_name, msg_payload, callback);
}

exports.make_request = make_request;