import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Logo from './logo';
import BirdHouse from './birdLogo';
import NavItem from './navItem';


class Navbar extends Component {
    render() {

        const createNavBarItem = (item, index) => {
            return <NavItem key={item.name + index} href={item.href} title={item.title} dropdown={item.dropdown} button={item.button} theme={this.props.logo} />
        }

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Logo href="http://localhost:3000/" logo={this.props.logo}></Logo>
                        </div>
                        <div className="nav navbar-nav navbar-right"  >
                            <ul className="nav navbar-nav" >
                                {this.props.items.map(createNavBarItem)}
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