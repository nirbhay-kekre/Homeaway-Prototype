import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

class NavItem extends Component {
    render() {
        const dropdownItem = (item, index) => {
            if(item.type === "divider"){
                return <div className="dropdown-divider" key={"dropDown_"+item.title+"_"+index}></div>
            }else if (item.onClick) {
                return <Link to={item.to ? item.to : "#"} className="dropdown-item" onClick={item.onClick} key={"Link_"+item.title+"_"+index}>{item.title}</Link>;
            } else {
                return <Link to={item.to ? item.to : "#"} className="dropdown-item" key={"Link_"+item.title+"_"+index} >{item.title}</Link>;
            }
        }
        let element = null;
        let themeStyle = {
            color: (this.props.theme === 'white' ? '#fff' : '#0067db')
        }
        if (this.props.dropdown) {
            element =
                <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" style={themeStyle} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.title}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {this.props.dropdown.map(dropdownItem)}
                    </div>
                </div>
                
        } else if (this.props.button) {
            element = <Link to={this.props.to ? this.props.to : "#"} className="btn btn-light">{this.props.title}</Link>
        } else {
            element = <Link to={this.props.to ? this.props.to : "#"} className='nav-link' style={themeStyle}> {this.props.title}</Link>
        }
        return (
            <li className="nav-item">
                {element}
            </li>
        )
    }
}

export default NavItem;