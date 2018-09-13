let express = require("express");
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
app.post("/calculate", function(req, resp){
    console.log("inside calculate "+ req.body.expression)
    let expression = req.body.expression;
    let result = {
        result: null
    };
    try{
        result.result = eval(expression);
    }catch(e){
        console.log(`Error: ${e}`);
        result.result ="Syntax Error"
    }
    resp.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    resp.end(JSON.stringify(result));
});
app.listen(3030);
console.log("Server Listening on port 3030");