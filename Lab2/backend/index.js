let express = require('express');
let bodyParser = require("body-parser");
let session = require('express-session');
let cookieParser = require('cookie-parser');
let cors = require('cors');
let expressValidator = require("express-validator");
var morgan = require('morgan');
let passport = require('passport');
let login = require("./routes/login");
let signup = require("./routes/signUp");
// let signout = require("./routes/signout");
let profile = require("./routes/profile");
let property = require("./routes/property");
let ownerProperty = require("./routes/ownerProperty");
let travelerProperty = require("./routes/travelerProperty");
// let sessionValidator = require("./routes/sessionValidator");
let makeMeOwner = require("./routes/makeMeOwner");
const config = require('./authProxy/config/settings');


let app = express();
// Set up middleware
let requireAuth = passport.authenticate('jwt', {session: false});

app.use(cors({ origin: `http://${config.frontend_host}:${config.frontend_port}`, credentials: true }));
app.use(cookieParser());
app.use(session({
    secret              : 'askjfn2r|e123asjk1@vhdas%539*EQ46',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

 app.use(bodyParser.urlencoded({
     extended: true,
     limit: 1024 * 1024 *5
   }));
app.use(bodyParser.json({limit:1024 * 1024 *5}));
// app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://${config.frontend_host}:${config.frontend_port}`);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(expressValidator());

// Log requests to console
app.use(morgan('dev'));
app.use(passport.initialize());
// Bring in defined Passport Strategy
require('./authProxy/config/passport')(passport);
console.log(__dirname);
app.use("/profilePic",express.static(__dirname+ "/uploads/profile"))
app.use("/propertyPic",express.static(__dirname+"/uploads/property"))
app.use("/login", login);
app.use("/signup", signup);
// app.use("/signout", signout);
app.use("/", requireAuth);
app.use("/profile", profile);
app.use("/property", property);
app.use("/property", ownerProperty);
app.use("/property", travelerProperty);
app.use("/makeMeOwner", makeMeOwner);



app.listen(config.backend_port, () => console.log(`Server listening on port ${config.backend_port}`))
