import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies'
import OwnerDashboardTab from './dashBoardTab'
import { Redirect } from 'react-router';
import Navbar from './../nav/navbar' 
import PostProperty from './../postProperty/postProperty'

class OwnerPostProperties extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        let redirectVar = null
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login/owner/"></Redirect>
        }
        return (
            <div>
                {redirectVar}
                <Navbar showMenu={true} logo="blue"></Navbar>
                <OwnerDashboardTab currentComponent="OwnerPostProperty" />
                <div className="container">
                    <PostProperty/>
                </div>
            </div>
        )
    }
}

export default OwnerPostProperties;