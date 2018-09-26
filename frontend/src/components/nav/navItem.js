import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

class NavItem extends Component {
    render() {
        const dropdownItem= (item,index)=>{
            if(item.onClick){
                return <li><Link to= {item.to?item.to:"#"} className="nav-link" onClick={item.onClick} >{item.title}</Link></li>;
            }else{
                return <li><Link to= {item.to?item.to:"#"} className="nav-link" >{item.title}</Link></li>;
            }
        }
        let element = null;
        let themeStyle = {
            color: (this.props.theme === 'white'? '#fff':'#0067db')
        }
        if (this.props.dropdown) {
            element = <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id={this.props.title + "dropdown"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={themeStyle}>
              {this.props.title}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              {this.props.dropdown.map(dropdownItem)}
            </ul>
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