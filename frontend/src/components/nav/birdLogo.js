import React, {Component} from 'react';
import bluelogo from './birdhouse-blue.svg';
import whitelogo from './birdhouse-white.svg';

class BirdHouse extends Component{
    render(){
        let image = null;
        if(this.props.logo === "white"){
            image = <a href="#"><img src={whitelogo}></img></a>
        }else{
            image = <a href="#"><img src={bluelogo}></img></a>
        }
        return(image);
    }
}

export default BirdHouse;