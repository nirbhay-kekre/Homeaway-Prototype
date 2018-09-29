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
            items:[]
        }
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        axios.delete("http://localhost:3001/signout");
        this.setState({loggedOut: true});
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
                items:navOptions
            });
        }
    }

    render() {

        const createNavBarItem = (item, index) => {
            return <NavItem key={item.name + index} to={item.to} title={item.title} dropdown={item.dropdown} button={item.button} theme={this.props.logo} />
        }
        let customBorderStyle={};
        if(this.props.logo === "blue"){
            customBorderStyle.borderBottom = "1px solid #dbdbdb";
        }

        return (
            <div style={ customBorderStyle}>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Logo to="/" logo={this.props.logo}></Logo>
                        </div>
                        <div className="nav navbar-nav navbar-right"  >
                            <ul className="nav navbar-nav" >
                                {this.state.items.map(createNavBarItem)}
                                <li > <BirdHouse logo={this.props.logo} ></BirdHouse></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }


}

export default Navbar;