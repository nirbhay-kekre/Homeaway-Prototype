var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

var token;
//POST method testing
describe("POST method homeaway testing login", function () {
    it("User should get logged in successfully for traveller with status code 200, response should have success:true, message: successful, username: ravindra.jadeja@bcci.com, role: both, jwt token should be returned", function (done) {
        chai.request('http://localhost:3001')
            .post('/login')
            .send({
                "username": "ravindra.jadeja@bcci.com",
                "password": "ravindra123",
                "role": "traveler"
            })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.true;
                expect(res.body.message).to.be.string;
                expect(res.body.message).to.equal('Successful');
                expect(res.body.username).to.be.string;
                expect(res.body.username).to.equal('ravindra.jadeja@bcci.com')
                expect(res.body.role).to.be.string;
                expect(res.body.role).to.be.not.empty;
                expect(res.body.token).to.be.string;
                expect(res.body.token).to.be.not.empty;
                token = res.body.token;
                done();
            });
    });
})

describe("POST method homeaway testing update profile", function () {
    it("User should be successfully update profile", function (done) {
        var agent = chai.request.agent('http://localhost:3001');
        agent
            .post('/profile/update')
            .set({ "Authorization": token })
            .send({
                "aboutme": "Cricketer in Indian Cricket Team,1",
                "city": "San Jose",
                "company": "BCCI",
                "school": "NITK",
                "hometown": "Indore",
                "languages": "English",
                "profilefilepath": "http://localhost:3001/profilePic/ravindra.jadeja@bcci.com_profile.jpeg",
                "createdOn": "2018-10-22T10:45:40.124Z",
                "gender": "M",
                "phone": "102842994",
                "username": "ravindra.jadeja@bcci.com",
                "firstname": "Jadu",
                "lastname": "Jadeja"
            })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.true;
                expect(res.body.message).to.be.string;
                expect(res.body.message).to.equal("Successful");
                expect(res.body.profilefilepath).to.be.string;
                expect(res.body.profilefilepath).to.equal("http://localhost:3001/profilePic/ravindra.jadeja@bcci.com_profile.jpeg");
                done();
            });
    })

})
// Get method testing
describe("GET method homeaway testing search property", function () {
    it("User should get list of search results successfully upon searching properties", function (done) {
        var agent = chai.request.agent('http://localhost:3001');
        agent
            .get('/property/search/list')
            .set({ "Authorization": token })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.true;
                expect(res.body.message).to.be.string;
                expect(res.body.total).to.be.an('number');
                expect(res.body.limit).to.be.an('number');
                expect(res.body.page).to.be.an('number');
                expect(res.body.pages).to.be.an('number');
                expect(res.body.message).to.equal("Successful");
                expect(res.body.results).to.be.an('array');
                done();
            });
    })

})

describe("GET method homeaway testing view profile", function () {
    it("User should able to get his profile ditails", function (done) {
        var agent = chai.request.agent('http://localhost:3001');
        agent
            .get('/profile/view')
            .set({ "Authorization": token })
            .query({ username: "ravindra.jadeja@bcci.com" })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.true;
                expect(res.body.username).to.equal('ravindra.jadeja@bcci.com');
                expect(res.body.firstname).to.be.string;
                expect(res.body.lastname).to.be.string;
                expect(res.body.aboutme).to.be.string;
                expect(res.body.city).to.be.string;
                expect(res.body.company).to.be.string;
                expect(res.body.school).to.be.string;
                expect(res.body.hometown).to.be.string;
                expect(res.body.gender).to.be.string;
                expect(res.body.createdOn).to.be.not.null;
                done();
            });
    })

})

describe("GET Travelers booking history", function () {
    it("User should able to get history of his trips", function (done) {
        var agent = chai.request.agent('http://localhost:3001');
        agent
            .get('/property/history')
            .set({ "Authorization": token })
            .query({ historyFor: "owner" })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.true;
                expect(res.body.properties).to.be.an('array');
                done();
            });
    })

})