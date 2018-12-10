const graphql = require('graphql');
const _ = require('lodash');
const kafka = require('./../kafka/asyncClient');
const { LOGIN_REQUEST_TOPIC, LOGIN_RESPONSE_TOPIC, SIGNUP_REQUEST_TOPIC, SIGNUP_RESPONSE_TOPIC } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./responses');
const jwt = require('jsonwebtoken');
const config = require('./../authProxy/config/settings');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
} = graphql;

const credentialsType = new GraphQLObjectType({
    name: 'credentials',
    fields: ( ) => ({
        statusCode: {type: GraphQLInt},
        success: {type: GraphQLBoolean},
        message: {type: GraphQLString},
        detail: {type: GraphQLString},

        username: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        token: {type: GraphQLString},
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: {
            type: credentialsType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                role: { type: GraphQLString }
            },
            async resolve(parent, args){
                var body ={
                    username: args.username,
                    password: args.password,
                    role: args.role
                }
                
                let res = await kafka.make_request(LOGIN_REQUEST_TOPIC, LOGIN_RESPONSE_TOPIC, body, function (err, result) {
                    if (err) {
                        return sendInternalServerError();
                    } else {
                        if(result.code === 200){
                            var token = jwt.sign(result.data, config.secret, {
                                expiresIn: 10080 // in seconds
                            });
                            result.data.token = 'JWT ' + token;
                        }
                       var r =  responseHandler(result);
                       return r;
                    }
                });
                return res;
            }
        },
        signup: {
            type: credentialsType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                role: { type: GraphQLString }
            },
            async resolve(parent, args){
                var body ={
                    username: args.username,
                    password: args.password,
                    firstname: args.firstname,
                    lastname: args.lastname,
                    role: args.role?  args.role : "traveler" //default user is traveler
                }
                
                let res = await kafka.make_request(SIGNUP_REQUEST_TOPIC, SIGNUP_RESPONSE_TOPIC, body, function (err, result) {
                    if (err) {
                        return sendInternalServerError();
                    } else {
                        let r =responseHandler(result);
                        return r;
                    }
                });
                return res;
            }
        }
    
    }
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        
        book: {
            type: credentialsType,
            args: { username: { type: GraphQLString } },
            resolve(parent, args){
                return {success:true};
            }
        },
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});