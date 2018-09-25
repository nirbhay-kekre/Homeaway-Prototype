import React, {Component} from 'react';
import bluelogo from './blue.svg';
import whitelogo from './white.svg';
import {Link} from 'react-router-dom';
import './navbar.css'

class Logo extends Component{
    render(){
        let image = null;
        if(this.props.logo === "white"){
            image = <Link to={this.props.to}><img src={whitelogo} alt="Logo"></img></Link>
        }else{
            image = <Link to={this.props.to}><img src={bluelogo} alt="Logo"></img></Link>
        }
        return(image);
    }
}

export default Logo;