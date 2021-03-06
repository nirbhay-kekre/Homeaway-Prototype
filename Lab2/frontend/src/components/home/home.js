import React, { Component } from 'react';
import Navbar from './../nav/navbar';
import './home.css';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import SearchHeaderForm from '../search/searchHeaderForm';
// import { Redirect } from 'react-router';

class Home extends Component {
    render() {
        console.log("rendering home");
        console.log(this.props);
        let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = "/login"
        // } else {
            redirectVar = "/search/list"
        // }
        return (
            <div className="home-container">
                <Navbar showMenu={true} logo="white"></Navbar>
                <div className="home-inner d-flex">
                    <div className="home-search w-100 m-auto">
                        <h1 id="intro" style={{ color: "#fff" }}>
                            <span>Book beach houses, cabins,</span><br />
                            <span>condos and more, worldwide</span>
                        </h1>

                        <SearchHeaderForm/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;