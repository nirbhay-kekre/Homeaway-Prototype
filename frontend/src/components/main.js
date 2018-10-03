import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './home/home';
import Login from './login/login'
import Signup from './signup/signup'
import OwnerLogin from './login/ownerLogin'
import Welcome from './welcome/welcome'
import ProfileView from './profile/profileView'
import ProfileUpdate from './profile/profileUpdate'
import SearchList from './search/searchList';
import SearchDetail from './search/searchDetail'

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
                <Route exact path="/profile/view" component={ProfileView} />
                <Route exact path="/profile/update" component={ProfileUpdate} />
                <Route exact path="/search/list" component={SearchList}></Route>
                <Route exact path='/search/detail' component={SearchDetail}></Route>
            </div>
        )
    }
}
//Export The Main Component
export default Main;