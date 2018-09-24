import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './home/home';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Home} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;