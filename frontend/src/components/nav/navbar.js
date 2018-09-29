import React, { Component } from 'react';
import Logo from './logo';
import BirdHouse from './birdLogo';
import NavItem from './navItem';
import './navbar.css'
import cookie from 'react-cookies';
import axios from 'axios';


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            items: []
        }
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        axios.delete("http://localhost:3001/signout");
        this.setState({ loggedOut: true });
    }

    componentWillMount() {
        if (this.props.showMenu) {
            let navOptions = [
                {
                    title: "Trip boards",
                    to: "#",
                    dropdown: false,
                    button: false
                },
            ];
            let localCookie = cookie.load('cookie');
            if (localCookie) {
                localCookie = JSON.parse(localCookie.substring(2, localCookie.length))
                let name = ""
                if (localCookie["firstname"]) {
                    name = localCookie["firstname"];
                }
                if (localCookie["lastname"]) {
                    if (name) {
                        name += " " + localCookie["lastname"].charAt(0) + "."
                    } else {
                        name = localCookie["lastname"]
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
                        to: "#"
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
                if (localCookie["role"] === "owner" || localCookie["role"] === "both") {
                    userOptions["dropdown"].push({
                        type: "divider"
                    });
                    userOptions["dropdown"].push({
                        title: "Owner Dashboard",
                        to: "/owner/dashboard"
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
            navOptions.push({
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
                    to: "#",
                    dropdown: false,
                    button: true
                });
            this.setState({
                items: navOptions
            });
        }
    }

    render() {

        const createNavBarItem = (item, index) => {
            return <NavItem key={item.name + index} to={item.to} title={item.title} dropdown={item.dropdown} button={item.button} theme={this.props.logo} />
        }
        let customBorderStyle = {};
        if (this.props.logo === "blue") {
            customBorderStyle.borderBottom = "1px solid #dbdbdb";
        }

        return (
            <div style={customBorderStyle}>
                <nav className="navbar navbar-expand-lg navbar-dark bd-navbar">
                        <button class="navbar-toggler navbar-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-brand mr-0 mr-md-2 ">
                            <Logo className="navbar-brand " to="/" logo={this.props.logo}></Logo>
                        </div>
                        <div className="navbar-right d-xs-block d-lg-none">
                            <BirdHouse logo={this.props.logo} ></BirdHouse>
                        </div>
                        <div class="collapse navbar-collapse float-right text-nowarp w-100" id="navbarSupportedContent">
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