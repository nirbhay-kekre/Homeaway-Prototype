import React, { Component } from 'react';
import Logo from './logo';
import BirdHouse from './birdLogo';
import NavItem from './navItem';
import './navbar.css'
import cookie from 'react-cookies';
import axios from 'axios';


class Navbar extends Component {
    constructor(props) {
        console.log("called");
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.navContent = this.navContent.bind(this);
        this.state = {
            items: [],
            forceReload: true
        }
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        axios.delete("http://localhost:3001/signout");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("loggedInUser");
        const navOptions = this.navContent();
        this.setState({
            items: navOptions
        })
        return false;
    }

    componentWillMount() {
        const navOptions = this.navContent();
        this.setState({
            items: navOptions
        })
    }

    navContent = () => {
        if (!this.props.showMenu) {
            return [];
        }
        if (this.props.showMenu) {
            let navOptions = [
                {
                    title: "Trip boards",
                    to: "#",
                    dropdown: false,
                    button: false
                },
            ];
            let loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                loggedInUser = JSON.parse(loggedInUser)
                let name = ""
                if (loggedInUser["firstname"]) {
                    name = loggedInUser["firstname"];
                }
                if (loggedInUser["lastname"]) {
                    if (name) {
                        name += " " + loggedInUser["lastname"].charAt(0) + "."
                    } else {
                        name = loggedInUser["lastname"]
                    }
                }
                if (!name) {
                    name = "Me"
                }
                let userOptions = {
                    title: name,
                    dropdown: [{
                        title: "Inbox",
                        to: "#"
                    }, {
                        title: "My trips",
                        to: "/mytrips"
                    }, {
                        title: "My profile",
                        to: "/profile/view"
                    }, {
                        title: "Account",
                        to: "#"
                    }, {
                        title: "Logout",
                        to: "/",
                        onClick: this.handleLogout
                    }]
                }
                if (loggedInUser["role"] === "owner" || loggedInUser["role"] === "both") {
                    userOptions["dropdown"].push({
                        type: "divider"
                    });
                    userOptions["dropdown"].push({
                        title: "Owner Dashboard",
                        to: "/owner/dashboard/all"
                    });
                }
                navOptions.push(userOptions);
            } else {
                navOptions.push({
                    title: "Login",
                    dropdown: [{
                        title: "Traveler login",
                        to: "/login"
                    }, {
                        title: "Owner login",
                        to: "/login/owner"
                    }],
                    button: false
                });
            }
            navOptions.push(
                {
                    title: "Help",
                    dropdown: [
                        {
                            title: "Visit help center",
                            to: "#",
                        },
                        {
                            title: "How it Works",
                            to: "#"
                        },
                        {
                            title: "Security",
                            to: "#"
                        }
                    ]
                },
                {
                    title: "List your property",
                    to: "/signup/owner/",
                    dropdown: false,
                    button: true
                }
            );
            return navOptions;


        }
    }

    render() {

        const createNavBarItem = (item, index) => {
            return <NavItem key={item.title + index} to={item.to} title={item.title} dropdown={item.dropdown} button={item.button} theme={this.props.logo} />
        }
        let customBorderStyle = {}, customToggleBackground ={};
        if (this.props.logo !== "white") {
            customBorderStyle.borderBottom = "1px solid #dbdbdb";
            customToggleBackground.backgroundImage = `url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0,103,219, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E")`;
        }

        return (
            <div style={customBorderStyle}>
                <nav className="navbar navbar-expand-lg navbar-dark bd-navbar">
                    <button className="navbar-toggler navbar-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={customToggleBackground}></span>
                    </button>
                    <div className="navbar-brand mr-0 mr-md-2 ">
                        <Logo className="navbar-brand " to="/" logo={this.props.logo}></Logo>
                    </div>
                    <div className="navbar-right d-xs-block d-lg-none">
                        <BirdHouse logo={this.props.logo} ></BirdHouse>
                    </div>
                    <div className="collapse navbar-collapse float-right text-nowarp w-100" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto " >
                            {this.state.items.map(createNavBarItem)}
                        </ul>
                    </div>
                    <div className="navbar-right d-none d-lg-block">
                        <BirdHouse logo={this.props.logo} ></BirdHouse>
                    </div>
                </nav>
            </div>
        );
    }


}

export default Navbar;