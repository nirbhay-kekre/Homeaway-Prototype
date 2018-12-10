const graphql = require('graphql');
const _ = require('lodash');
const kafka = require('../kafka/asyncClient');
const {
    LOGIN_REQUEST_TOPIC, LOGIN_RESPONSE_TOPIC,
    SIGNUP_REQUEST_TOPIC, SIGNUP_RESPONSE_TOPIC,
    CONVERSATION_VIEW_REQUEST, CONVERSATION_VIEW_RESPONSE,
    CONVERSATION_UPDATE_REQUEST, CONVERSATION_UPDATE_RESPONSE,
    LIST_PROPERTY_REQUEST_TOPIC, LIST_PROPERTY_RESPONSE_TOPIC,
    PROFILE_VIEW_REQUEST_TOPIC, PROFILE_VIEW_RESPONSE_TOPIC,
    PROFILE_UPDATE_REQUEST_TOPIC, PROFILE_UPDATE_RESPONSE_TOPIC,
    DETAIL_PROPERTY_REQUEST_TOPIC, DETAIL_PROPERTY_RESPONSE_TOPIC,
    BOOK_PROPERTY_REQUEST, BOOK_PROPERTY_RESPONSE,
    PROPERTY_HISTORY_REQUEST_TOPIC, PROPERTY_HISTORY_RESPONSE_TOPIC,
    MAKE_ME_OWNER_REQUEST_TOPIC, MAKE_ME_OWNER_RESPONSE_TOPIC
} = require('../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest, sendAuthenticationFailure } = require('./responses');
const jwt = require('jsonwebtoken');
const config = require('../authProxy/config/settings');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLFloat
} = graphql;
const commonResponseField = {
    statusCode: { type: GraphQLInt },
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    detail: { type: GraphQLString },
}

const credentialsType = new GraphQLObjectType({
    name: 'credentials',
    fields: () => ({
        ...commonResponseField,
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        token: { type: GraphQLString },
    })
});
const messageType = new GraphQLObjectType({
    name: 'message',
    fields: () => ({
        from: { type: GraphQLString },
        to: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const conversationType = new GraphQLObjectType({
    name: 'conversation',
    fields: () => ({
        owner: { type: GraphQLString },
        traveler: { type: GraphQLString },
        headline: { type: GraphQLString },
        propertyId: { type: GraphQLString },
        messages: {
            type: new GraphQLList(messageType),
        }
    })
});
const conversationsType = new GraphQLObjectType({
    name: 'conversations',
    fields: () => ({
        ...commonResponseField,
        conversations: {
            type: new GraphQLList(conversationType),
        }
    })
});

const availabilityType = new GraphQLObjectType({
    name: 'availability',
    fields: () => ({
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString }
    })
});

const historyType = new GraphQLObjectType({
    name: "history",
    fields: () => ({
        guests: { type: GraphQLID },
        buyer: { type: GraphQLString },
        arrivalDate: { type: GraphQLString },
        departureDate: { type: GraphQLString },
        amountPaid: { type: GraphQLID }
    })
});

const bookingHistoryType = new GraphQLObjectType({
    name: "bookingHistory",
    fields: () => ({
        ...commonResponseField,
        properties: {
            type: new GraphQLList(propertySchemaType)
        },
    })
})

const propertySchemaType = new GraphQLObjectType({
    name: "property",
    fields: () => ({
        ...commonResponseField,
        propertyId: { type: GraphQLString },
        headline: { type: GraphQLString },
        propertyType: { type: GraphQLString },
        bedroom: { type: GraphQLInt },
        bathroom: { type: GraphQLInt },
        accomodates: { type: GraphQLInt },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLInt },
        country: { type: GraphQLString },
        oneNightRate: { type: GraphQLFloat },
        amenities: {
            type: new GraphQLList(GraphQLString)
        },
        photoUrl: {
            type: new GraphQLList(GraphQLString)
        },
        owner: { type: GraphQLString },
        propertyDescription: { type: GraphQLString },
        bookingOption: { type: GraphQLString },
        minNightStay: { type: GraphQLInt },
        availability: {
            type: new GraphQLList(availabilityType)
        },
        history: {
            type: new GraphQLList(historyType)
        },
        guests: { type: GraphQLInt },
        arrivalDate: { type: GraphQLString },
        departureDate: { type: GraphQLString },
        totalPrice: { type: GraphQLString }
    })
});

const propertiesType = new GraphQLObjectType({
    name: "properties",
    fields: () => ({
        ...commonResponseField,
        results: {
            type: new GraphQLList(propertySchemaType)
        },
        total: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
        pages: { type: GraphQLInt },
    })
});

const profileType = new GraphQLObjectType({
    name: "profile",
    fields: () => ({
        ...commonResponseField,
        aboutme: { type: GraphQLString },
        city: { type: GraphQLString },
        company: { type: GraphQLString },
        school: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        profilefilepath: { type: GraphQLString },
        createdOn: { type: GraphQLString },
        gender: { type: GraphQLString },
        phone: { type: GraphQLString },
        username: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
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
            async resolve(parent, args) {
                var body = {
                    username: args.username,
                    password: args.password,
                    role: args.role
                }

                let res = await kafka.make_request(LOGIN_REQUEST_TOPIC, LOGIN_RESPONSE_TOPIC, body, function (err, result) {
                    if (err) {
                        return sendInternalServerError();
                    } else {
                        if (result.code === 200) {
                            var token = jwt.sign(result.data, config.secret, {
                                expiresIn: 10080 // in seconds
                            });
                            result.data.token = 'JWT ' + token;
                        }
                        var r = responseHandler(result);
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
            async resolve(parent, args) {
                var body = {
                    username: args.username,
                    password: args.password,
                    firstname: args.firstname,
                    lastname: args.lastname,
                    role: args.role ? args.role : "traveler" //default user is traveler
                }

                let res = await kafka.make_request(SIGNUP_REQUEST_TOPIC, SIGNUP_RESPONSE_TOPIC, body, function (err, result) {
                    if (err) {
                        return sendInternalServerError();
                    } else {
                        let r = responseHandler(result);
                        return r;
                    }
                });
                return res;
            }
        },
        makeMeOwner: {
            type: credentialsType,

            async resolve(parent, args, context) {
                if (context.user) {
                    var body = {
                        username: context.user.username,
                        role: "both"
                    }

                    let res = await kafka.make_request(MAKE_ME_OWNER_REQUEST_TOPIC, MAKE_ME_OWNER_RESPONSE_TOPIC, body, function (err, result) {
                        if (err) {
                            return sendInternalServerError();
                        } else {
                            if (result.code === 200) {
                                var token = jwt.sign(result.data, config.secret, {
                                    expiresIn: 10080 // in seconds
                                });
                                result.data.token = 'JWT ' + token;
                            }
                            var r = responseHandler(result);
                            return r;
                        }
                    });
                    return res;
                } else {
                    return sendAuthenticationFailure();
                }
            }
        },
        sendMessage: {
            type: conversationsType,
            args: {
                owner: { type: GraphQLString },
                traveler: { type: GraphQLString },
                propertyId: { type: GraphQLString },
                to: { type: GraphQLString },
                from: { type: GraphQLString },
                message: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                var body = {
                    owner: args.owner,
                    traveler: args.traveler,
                    to: args.to,
                    from: args.from,
                    propertyId: args.propertyId,
                    message: args.message
                }
                if (context.user) {
                    let res = await kafka.make_request(CONVERSATION_UPDATE_REQUEST, CONVERSATION_UPDATE_RESPONSE, body, function (err, result) {
                        if (err) {
                            return sendInternalServerError();
                        } else {
                            let r = responseHandler(result);
                            return r;
                        }
                    });
                    return res;
                } else {
                    return sendAuthenticationFailure();
                }
            }

        },
        updateProfile: {
            type: profileType,
            args: {
                aboutme: { type: GraphQLString },
                city: { type: GraphQLString },
                company: { type: GraphQLString },
                school: { type: GraphQLString },
                hometown: { type: GraphQLString },
                languages: { type: GraphQLString },
                profilefilepath: { type: GraphQLString },
                createdOn: { type: GraphQLString },
                gender: { type: GraphQLString },
                phone: { type: GraphQLString },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                var body = {
                    aboutme: args.aboutme,
                    city: args.city,
                    company: args.company,
                    school: args.school,
                    hometown: args.hometown,
                    languages: args.languages,
                    profilefilepath: args.profilefilepath,
                    createdOn: args.createdOn,
                    gender: args.gender,
                    phone: args.phone,
                    firstname: args.firstname,
                    lastname: args.lastname,
                }
                if (context.user) {
                    body.username = context.user.username;
                    let res = await kafka.make_request(PROFILE_UPDATE_REQUEST_TOPIC, PROFILE_UPDATE_RESPONSE_TOPIC, body, function (err, result) {
                        if (err) {
                            return sendInternalServerError();
                        } else {
                            let r = responseHandler(result);
                            return r;
                        }
                    });
                    console.log(res);
                    return res;
                } else {
                    return sendAuthenticationFailure();
                }
            }
        },
        bookProperty: {
            type: propertySchemaType,
            args: {
                propertyId: { type: GraphQLString },
                arrivalDate: { type: GraphQLString },
                departureDate: { type: GraphQLString },
                guests: { type: GraphQLInt },
                amountPaid: { type: GraphQLFloat }
            },
            async resolve(parent, args, context) {
                var body = {
                    propertyId: args.propertyId,
                    arrivalDate: args.arrivalDate,
                    departureDate: args.departureDate,
                    guests: args.guests,
                    amountPaid: args.amountPaid,
                }
                if (context.user) {
                    body.username = context.user.username;
                    let res = await kafka.make_request(BOOK_PROPERTY_REQUEST, BOOK_PROPERTY_RESPONSE, body, function (err, result) {
                        if (err) {
                            return sendInternalServerError();
                        } else {
                            let r = responseHandler(result);
                            return r;
                        }
                    });
                    console.log(res);
                    return res;
                } else {
                    return sendAuthenticationFailure();
                }
            }
        }

    }
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getMessage: {
            type: conversationsType,
            async resolve(parent, args, context) {
                let user = context.user;
                if (user) {
                    let resp = await kafka.make_request(CONVERSATION_VIEW_REQUEST, CONVERSATION_VIEW_RESPONSE, user, function (err, result) {
                        if (err) {
                            return sendInternalServerError();
                        } else {
                            return responseHandler(result);
                        }
                    });
                    return resp;
                } else {
                    return sendAuthenticationFailure();
                }
            }
        },
        properties: {
            type: propertiesType,
            args: {
                pagination: { type: GraphQLString },
                filters: { type: GraphQLString },
            },
            async resolve(parent, args, context) {
                var body = {
                    pagination: args.pagination,
                    filters: args.filters,
                }
                if (context.user) {
                    let res = await kafka.make_request(LIST_PROPERTY_REQUEST_TOPIC, LIST_PROPERTY_RESPONSE_TOPIC, body, function (err, result) {
                        if (err) {
                            return sendInternalServerError();
                        } else {
                            let r = responseHandler(result);
                            return r;
                        }
                    });
                    console.log(res);
                    return res;
                } else {
                    return sendAuthenticationFailure();
                }
            }

        },
        property: {
            type: propertySchemaType,
            args: {
                propertyId: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                var body = {
                    propertyId: args.propertyId
                }
                if (context.user) {
                    let res = await kafka.make_request(DETAIL_PROPERTY_REQUEST_TOPIC, DETAIL_PROPERTY_RESPONSE_TOPIC, body, function (err, result) {
                        if (err) {
                            return sendInternalServerError();
                        } else {
                            let r = responseHandler(result);
                            return r;
                        }
                    });
                    console.log(res);
                    return res;

                } else {
                    return sendAuthenticationFailure();
                }
            }

        },
        profile: {
            type: profileType,
            args: {
                username: { type: GraphQLString },
            },
            async resolve(parent, args, context) {
                var body = {
                    username: args.username,
                }
                if (context.user) {
                    let res = await kafka.make_request(PROFILE_VIEW_REQUEST_TOPIC, PROFILE_VIEW_RESPONSE_TOPIC, body, function (err, result) {
                        if (err) {
                            return sendInternalServerError();
                        } else {
                            let r = responseHandler(result);
                            return r;
                        }
                    });
                    console.log(res);
                    return res;
                } else {
                    return sendAuthenticationFailure();
                }
            }

        },
        history: {
            type: bookingHistoryType,
            args: {
                historyFor: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                var body = {
                    historyFor: args.historyFor,
                }
                if (context.user) {
                    body.username = context.user.username;
                    let res = await kafka.make_request(PROPERTY_HISTORY_REQUEST_TOPIC, PROPERTY_HISTORY_RESPONSE_TOPIC, body, function (err, result) {
                        if (err) {
                            return sendInternalServerError();
                        } else {
                            let r = responseHandler(result);
                            return r;
                        }
                    });
                    console.log(res);
                    return res;
                } else {
                    return sendAuthenticationFailure();
                }
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});