import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class NavItem extends Component {
    render() {
        const dropdownItem= (item,index)=>{
            return <li><a href= {item.href?item.href:"#"} className="nav-link">{item.title}</a></li>;;
        }
        let element = null;
        let themeStyle = {
            color: (this.props.theme === 'white'? '#fff':'#0067db')
        }
        if (this.props.dropdown) {

            element = <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id={this.props.title + "dropdown"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={themeStyle}>
              {this.props.title}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
              {this.props.dropdown.map(dropdownItem)}
            </ul>
          </div>
        } else if (this.props.button) {
            element = <a href={this.props.href ? this.props.href : "#"} class="btn btn-light">{this.props.title}</a>
        } else {
            element = <a href={this.props.href ? this.props.href : "#"} className='nav-link' style={themeStyle}> {this.props.title}</a>
        }
        return (
            <li className="nav-item">
                {element}
            </li>
        )
    }
}

export default NavItem;