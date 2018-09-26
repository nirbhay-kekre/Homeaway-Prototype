import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './home/home';
import Login from './login/login'
import Signup from './signup/signup'
import OwnerLogin from './login/ownerLogin'
import Welcome from './welcome/welcome'

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login/owner" component={OwnerLogin} />
                <Route exact path="/welcome" component={Welcome} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;