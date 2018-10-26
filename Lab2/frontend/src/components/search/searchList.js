import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchPropertiesList } from './../../actions/fetchPropertyAction'
import SearchResultCard from './searchResultCard'
import Pagination from 'react-js-pagination'

class SearchList extends Component {

    constructor(props) {
        super(props);
        this.createCard = this.createCard.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    handlePageChange = (pageNumber) =>{
        this.props.fetchPropertiesList(this.props.filters, pageNumber)
    }

    componentWillReceiveProps(nextProps) {
        console.log("inside ********* SearchList ***** component will receive props");
        console.log({ props: this.props, nextProps });
        if (this.props.filters !== nextProps.filters)
            this.props.fetchPropertiesList(nextProps.filters);
    }

    componentDidMount() {
        console.log("calling fetch");
        this.props.fetchPropertiesList(this.props.filters);
    }

    createCard = () => {
        return (
            this.props.results.map((result, index) =>
                <SearchResultCard
                    key={"searchCard_" + index}
                    propertyId={result.propertyId}
                    photoUrl={result.photoUrl}
                    headline={result.headline}
                    street={result.street}
                    city={result.city}
                    state={result.state}
                    zip={result.zip}
                    bedroom={result.bedroom}
                    bathroom={result.bathroom}
                    accomodates={result.accomodates}
                    amenities={result.amenities}
                    oneNightRate={result.oneNightRate}
                    arrivalDate={this.props.filters.arrivalDate}
                    departureDate={this.props.filters.departureDate}
                    guests ={this.props.filters.accomodates.min}
                    minNightStay = {result.minNightStay}
                    //searchCity={this.props.filters.city}
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
                <div className="d-flex justify-content-center">
                   {this.props.results.length === 0 ? <div className='my-5'><h3>Sorry no properties found for your search criteria</h3></div> :  <Pagination
                        activePage={this.props.pagination.page}
                        itemsCountPerPage={this.props.pagination.limit}
                        totalItemsCount={this.props.pagination.total}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass = 'page-item'
                        linkClass = 'page-link'
                    />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    results: state.searchProperty.searchResults,
    filters: state.searchProperty.filters,
    pagination: state.searchProperty.pagination,
})

SearchList.propTypes = {
    fetchProperties: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { fetchPropertiesList })(SearchList);
