import { gql } from 'apollo-boost';
const Queries={
    GET_BOOKING_HISTORY: gql`query getBookingHistory($historyFor: String!, $filters: String, $sold: Boolean) {
      history(historyFor: $historyFor, filters: $filters, sold: $sold) {
        statusCode
        success
        message
        properties {
          amenities
          photoUrl
          availability {
            startDate
            endDate
          }
          history {
            guests
            buyer
            arrivalDate
            departureDate
            amountPaid
          }
          propertyId
          headline
          propertyType
          bedroom
          bathroom
          accomodates
          street
          city
          state
          zip
          country
          oneNightRate
          owner
          propertyDescription
          bookingOption
          minNightStay
        }
      }
    }`,
      GET_PROFILE: gql`query getProfile($username: String!) {
        profile(username: $username) {
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
      GET_PROPERTIES: gql`query getProperties($pagination: String, $filters: String) {
        properties(pagination: $pagination, filters: $filters) {
          statusCode
          success
          message
          page
          total
          limit
          pages
          results {
            amenities
            photoUrl
            history {
              guests
              buyer
              arrivalDate
              departureDate
              amountPaid
            }
            propertyId
            headline
            propertyType
            bedroom
            bathroom
            accomodates
            street
            city
            state
            zip
            country
            oneNightRate
            owner
            propertyDescription
            bookingOption
            minNightStay
          }
        }
      }`,
      GET_PROPERTY: gql`query getProperty($propertyId: String!, $arrivalDate: String, $departureDate: String, $accomodates: Int) {
        property(propertyId: $propertyId, arrivalDate: $arrivalDate, departureDate: $departureDate, accomodates: $accomodates) {
          statusCode
          success
          message
          amenities
          photoUrl
          history {
            guests
            buyer
            arrivalDate
            departureDate
            amountPaid
          }
          propertyId
          headline
          propertyType
          bedroom
          bathroom
          accomodates
          street
          city
          state
          zip
          country
          oneNightRate
          owner
          propertyDescription
          bookingOption
          minNightStay
          guests
          arrivalDate
          departureDate
          totalPrice
        }
      }`,
      GET_MESSAGE: gql`{
        getMessage {
          statusCode
          success
          message
          detail
          conversations {
            owner
            traveler
            headline
            propertyId
            messages {
              from
              to
              message
            }
          }
        }
      }`,
}
export default Queries;