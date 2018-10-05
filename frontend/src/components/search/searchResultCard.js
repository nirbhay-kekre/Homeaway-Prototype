import React, {Component} from 'react'
import './search.css'
import ImageSlider from './imageSlider'
import { Link } from 'react-router-dom';

class SearchResultCard extends Component{
    render(){
        return (
            <div className="card m-3">
                <Link to={
                    {
                        pathname: "/search/detail",
                        state: {
                            propertyId: this.props.propertyId,
                            arrivalDate: this.props.arrivalDate,
                            departureDate: this.props.departureDate,
                            accomodates_min: this.props.guests,
                            city: this.props.searchCity,
                        }
                    }

                } className="text-dark">
                    <div className="card-body mr-0 pr-0 py-0">
                        <div className="row search-card-body mr-0">
                            <div className="col-6 col-md-3">
                                <ImageSlider images={this.props.photoUrl} fixedHeight={this.props.cardFixedHeight}></ImageSlider>
                            </div>
                            <div className="col-6 col-md-9 position-relative">
                                <div className="row w-100">
                                    <h5 className="card-title mb-0">{this.props.headline}</h5>
                                </div>
                                <div className="row w-100 mb-1">
                                    <small>{this.props.street + ", " + this.props.city + ", " + this.props.state + " " + this.props.zip}</small>
                                </div>
                                <div className="row w-100">
                                    <p className="card-text">
                                        <ul className="list-inline">
                                            {this.props.bedroom ? <li className="list-inline-item border-left pl-2"><strong>{this.props.bedroom}</strong> BR</li> : ""}
                                            {this.props.bathroom ? <li className="list-inline-item border-left pl-2"><strong>{this.props.bathroom}</strong> BA</li> : ""}
                                            {this.props.accomodates ? <li className="list-inline-item border-left pl-2">sleeps <strong>{this.props.accomodates}</strong></li> : ""}
                                            {(this.props.amenities && this.props.amenities.length > 0 ) ? this.props.amenities.slice(0, 5).map(element => <li className="list-inline-item border-left pl-2"><strong>{element}</strong></li>) : ""}
                                        </ul>
                                    </p>
                                </div>
                                <div className="row w-100 mt-auto p-2 position-absolute cardbottom">
                                    <div className="col-12">
                                        <h5 className="row">${this.props.oneNightRate} per night</h5>
                                        {this.props.customFooter? <p className="row">{this.props.customFooter}</p>:""}
                                        <small className="row">click for property details</small>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </Link>
            </div>
        );
    }
}

export default SearchResultCard;