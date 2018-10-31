import React, { Component } from 'react'
import PostPropertyAmenities from './postPropertyAmenities'
import PostPropertyAvailibility from './postPropertyAvailablity'
import PostPropertyBookingMethod from './postPropertyBookingMethod'
import PostPropertyDetail from './postPropertyDetail'
import PostPropertyLocation from './postPropertyLocation'
import PostPropertyPhotos from './postPropertyPhotos'
import PostPropertyPrice from './postPropertyPrice'
import PostPropertySideTab from './PostPropertySideTab'
import { Redirect } from 'react-router';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class PostProperty extends Component {

    renderCurrentTab = () => {
        let currentTabTag = null
        switch (this.props.currentTab) {
            case "location":
                currentTabTag = <PostPropertyLocation/>
                break;
            case "details":
                currentTabTag = <PostPropertyDetail/>
                break;
            case "bookingOptions":
                currentTabTag = <PostPropertyBookingMethod/>
                break;
            case "photos":
                currentTabTag = <PostPropertyPhotos/>
                break;
            case "amenities":
                currentTabTag = <PostPropertyAmenities/>
                break;
            case "pricing":
                currentTabTag = <PostPropertyPrice/>
                break;
            case "availablity":
                currentTabTag = <PostPropertyAvailibility/>
                break;
        }
        return currentTabTag;
    }

    render() {
        let errorMessage = null;
        let redirectVar = null;

        if (!localStorage.getItem("jwtToken")) {
            redirectVar = <Redirect to="/login/owner/"></Redirect>
        } 
        // if (this.state.errorMessage) {
        //     errorMessage = <div className="alert alert-danger alert-dismissible row m-2" role="alert">
        //         <div className="col-1"><i className="material-icons">warning</i></div>
        //         <div className="col-11">
        //             {this.state.errorMessage}
        //         </div>
        //         <div><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
        //     </div>
        // }
        return (
            <div className="container">
                {redirectVar}
                <div className="row">
                    <div className="col-3 border-right">
                        <PostPropertySideTab/>
                    </div>
                    <div className="col-9">
                        {errorMessage}
                        {this.renderCurrentTab()}
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentTab: state.postPropertyReducer.currentTab,
})

PostProperty.propTypes = {
    currentTab: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(PostProperty);