var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

var Cookie;
//POST method testing
describe("POST method homeaway testing login", function () {
    it("User should get logged in successfully for traveller with status code 200, response should have success:true, message: successfull, username: ravindra.jadeja@bcci.com, role: both, cookie is set", function (done) {
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
                expect(res.body.message).to.equal('Successfull');
                expect(res.body.username).to.be.string;
                expect(res.body.username).to.equal('ravindra.jadeja@bcci.com')
                expect(res.body.role).to.be.string;
                expect(res.body.role).to.equal('both')
                Cookie = res.headers['set-cookie'][0].split(";")[0];
                expect(Cookie).to.be.string;
                expect(Cookie).to.be.not.null;
                done();
            });
    });
})
describe("POST method homeaway testing update profile", function () {
    it("User should be successfully update profile", function (done) {
        var agent = chai.request.agent('http://localhost:3001');
        agent.post('/login')
            .send({
                "username": "ravindra.jadeja@bcci.com",
                "password": "ravindra123",
                "role": "traveler"
            }).then(function (res) {
                expect(res).to.have.cookie('cookie');
                return agent
                    .post('/profile/update')
                    .field('Content-Type', 'multipart/form-data')
                    .field('firstname', 'Jadu')
                    .field('lastname', 'Jadeja')
                    .field('aboutme', 'Cricketer in Indian Cricket Team, I love to travel')
                    .field('city', 'San Jose')
                    .field('company', 'BCCI')
                    .field('school', 'NITK')
                    .field('hometown', 'Indore')
                    .field('languages', 'English')
                    .field('gender', 'M')
                    .field('phone', '123456789')
                    .field('profilefilepath', 'http://localhost:3001/profilePic/ravindra.jadeja@bcci.com_profile.jpeg')
                    .attach('profilePhoto', null)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body.success).to.be.true;
                        expect(res.body.message).to.be.string;
                        expect(res.body.message).to.equal("profile updated");
                        expect(res.body.profilefilepath).to.be.string;
                        expect(res.body.profilefilepath).to.equal("http://localhost:3001/profilePic/ravindra.jadeja@bcci.com_profile.jpeg");
                        done();
                    });
            })

    });
})
// Get method testing
describe("GET method homeaway testing search property", function () {
    it("User should get list of search results successfully upon searching properties", function (done) {
        var agent = chai.request.agent('http://localhost:3001');
        agent.post('/login')
            .send({
                "username": "ravindra.jadeja@bcci.com",
                "password": "ravindra123",
                "role": "traveler"
            }).then(function (res) {
                expect(res).to.have.cookie('cookie');
                return agent
                    .get('/property/search/list')
                    .set('Cookie', Cookie)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body.success).to.be.true;
                        expect(res.body.message).to.be.string;
                        expect(res.body.message).to.match(/^\d+ results found$/);
                        expect(res.body.results).to.be.an('array');
                        done();
                    });
            })

    });
})

describe("GET method homeaway testing view profile", function () {
    it("User should able to get his profile ditails", function (done) {
        var agent = chai.request.agent('http://localhost:3001');
        agent.post('/login')
            .send({
                "username": "ravindra.jadeja@bcci.com",
                "password": "ravindra123",
                "role": "traveler"
            }).then(function (res) {
                expect(res).to.have.cookie('cookie');
                return agent
                    .get('/profile/view')
                    .set('Cookie', Cookie)
                    .then(function (res) {
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

    });
})

//DELETE method
describe("DELETE method homeaway testing logout", function () {
    it("User should log out successfully", function (done) {
        var agent = chai.request.agent('http://localhost:3001');
        agent.post('/login')
            .send({
                "username": "ravindra.jadeja@bcci.com",
                "password": "ravindra123",
                "role": "traveler"
            }).then(function (res) {
                expect(res).to.have.cookie('cookie');
                return agent
                    .delete('/signout')
                    .set('Cookie', Cookie)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body.success).to.be.true;
                        expect(res.body.message).to.be.string
                        expect(res.body.message).to.equal("successfully logged out");
                        done();
                    });
            })

    });
})