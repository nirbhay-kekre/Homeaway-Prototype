import { gql } from 'apollo-boost';
const Mutation = {
    SIGNUP: gql`mutation signup($username: String!, $password: String!, $firstname: String!,
        $lastname: String!) {
            signup(username: $username, password: $password, firstname: $firstname, 
                lastname: $lastname) {
                success
                message
                username
                role
                firstname
                lastname
                token,
                statusCode,
                detail
            }
        }`,
    LOGIN: gql`mutation login(	$username: String!, $password: String!, $role: String!){
        login(username:$username,password:$password, role:$role ){
            statusCode,
            success,
            message,
            username,
            role,
            firstname,
            lastname,
            token,
        }
      }`,
    MAKE_ME_OWNER: gql`mutation {
        makeMeOwner {
         statusCode,
            success,
            message,
            username,
            role,
            firstname,
            lastname,
            token,
       }
    }`,
    BOOK_PROPERTY: gql`mutation bookProperty($propertyId: String! , $arrivalDate: String! ,
         $departureDate: String! , $guests: Int!, $amountPaid: String! ) {
            bookProperty(
                propertyId: $propertyId,
                arrivalDate: $arrivalDate, 
                departureDate: $departureDate ,
                guests: $guests ,
                amountPaid: $amountPaid, 
            ) {
                statusCode
                success
                message
                detail
            }
        }`,
    UPDATE_PROFILE: gql`mutation updateProfile($aboutme: String, $city: String, $company: String, 
        $school: String, $hometown: String, $languages: String, $profilefilepath : String,
        $createdOn : String, $gender : String, $phone : String, $firstname: String!,
        $lastname: String! ) {
            updateProfile(
                aboutme: $aboutme,
                    city: $city, 
                    company: $company ,
                    school: $school ,
                    hometown: $hometown, 
                    languages: $languages, 
                    profilefilepath: $profilefilepath, 
                    createdOn: $createdOn, 
                    gender: $gender ,
                    phone: $phone ,
                    firstname: $firstname ,
                    lastname: $lastname
            ) {
                    statusCode
                    success
                    message
                    detail
                    aboutme 
                    city 
                    company 
                    school 
                    hometown 
                    languages 
                    profilefilepath 
                    createdOn 
                    gender 
                    phone 
                    username 
                    firstname 
                    lastname 
            }
        }`,
    SEND_MESSAGE: gql`mutation sendMessage($owner: String!, $traveler: String!,
         $propertyId: String!, $to: String!, $from: String!, $message: String!) {
        sendMessage(owner: $owner, traveler: $traveler, propertyId: $propertyId,
             to: $to, from: $from, message: $message) {
          success
          statusCode
        }
      }`
    
}
export default Mutation;