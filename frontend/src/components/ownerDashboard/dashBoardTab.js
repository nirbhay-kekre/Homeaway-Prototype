import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class OwnerDashboardTab extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="nav nav-tabs justify-content-center m-3 blue006">
                <li className="nav-item display-inline">
                    <Link className={"nav-link" + (this.props.currentComponent === "OwnerAllProperties" ? " active" : "")} to="/owner/dashboard/all">All Properties</Link>
                </li>
                <li className="nav-item display-inline">
                    <Link className={"nav-link" + (this.props.currentComponent === "OwnerSoldProperties" ? " active" : "")} to="/owner/dashboard/sold">Sold Properties</Link>
                </li>
                <li className="nav-item display-inline">
                    <Link className={"nav-link" + (this.props.currentComponent === "OwnerPostProperty" ? " active" : "")} to="/">Post Property</Link>
                </li>
            </ul>
        );
    }
}

export default OwnerDashboardTab;