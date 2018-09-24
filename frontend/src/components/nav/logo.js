import React, {Component} from 'react';
import bluelogo from './blue.svg';
import whitelogo from './white.svg';

class Logo extends Component{
    render(){
        let image = null;
        if(this.props.logo === "white"){
            image = <a href={this.props.href}><img src={whitelogo}></img></a>
        }else{
            image = <a href={this.props.href}><img src={bluelogo}></img></a>
        }
        return(image);
    }
}

export default Logo;