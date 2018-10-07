import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class PostPropertySideTab extends Component {
    render() {
        return (
            <ul className="nav flex-column">
                <li className="nav-item">
                    <p className="nav-link">Welcome</p>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "location" ? " text-white bg-primary disabled" : "")} name="location" onClick={this.props.handleClick} to="#">Location</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "details" ? " text-white bg-primary disabled" : "")} name="details" onClick={this.props.handleClick} to="#">Details</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "bookingOptions" ? " text-white bg-primary disabled" : "")} name="bookingOptions" onClick={this.props.handleClick} to="#">Booking Options</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "photos" ? " text-white bg-primary disabled" : "")} name="photos" onClick={this.props.handleClick} to="#">Photos</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "amenities" ? " text-white bg-primary disabled" : "")} name="amenities" onClick={this.props.handleClick} to="#">Amenities</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "pricing" ? " text-white bg-primary disabled" : "")} name="pricing" onClick={this.props.handleClick} to="#">Pricing</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "availablity" ? " text-white bg-primary disabled" : "")} name="availablity" onClick={this.props.handleClick} to="#">Availablity</Link>
                </li>
            </ul>
        )
    }
}
export default PostPropertySideTab;