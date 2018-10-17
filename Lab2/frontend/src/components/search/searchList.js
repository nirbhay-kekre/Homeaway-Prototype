import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {fetchPropertiesList} from './../../actions/fetchPropertyAction'
import SearchResultCard from './searchResultCard'


class SearchList extends Component {

    constructor(props){
        super(props);
        this.createCard=this.createCard.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log("inside ********* SearchList ***** component will receive props");
        console.log({ props: this.props, nextProps});
        if(this.props.filters  !== nextProps.filters)
            this.props.fetchPropertiesList(nextProps.filters);
    }

    componentDidMount(){
        console.log("calling fetch");
        this.props.fetchPropertiesList();
    }

    createCard = () => {
        return (
            this.props.results.map(result => 
                <SearchResultCard
                    propertyId={result.propertyId}
                    photoUrl={result.photoUrl}
                    headline={result.headline}
                    street={result.street}
                    city={result.city}
                    state={result.state}
                    zip={result.zip}
                    bedroom={result.bedrrom}
                    bathroom={result.bathroom}
                    accomodates={result.accomodates}
                    amenities={result.amenities}
                    oneNightRate={result.oneNightRate}
                    // arrivalDate={this.state.arrivalDate}
                    // departureDate={this.state.departureDate}
                    // guests ={this.state.filters.accomodates.min}
                    // searchCity={this.state.filters.city}
                    cardFixedHeight="150px"
                    cardIndex={result.propertyId}
                ></SearchResultCard>
            )
        );
    }

    render() {
        return (
            <div className="container">
                {this.createCard()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    results: state.searchProperty.searchResults,
    filters:  state.searchProperty.filters
})

SearchList.propTypes = {
    fetchProperties : PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { fetchPropertiesList })(SearchList);
