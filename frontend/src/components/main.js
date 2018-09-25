import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './home/home';
import Login from './login/login'

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;