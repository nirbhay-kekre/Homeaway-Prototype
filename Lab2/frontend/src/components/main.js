import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home/home';
import Login from './login/login'
// import Signup from './signup/signup'
// import OwnerLogin from './login/ownerLogin'
// import Welcome from './welcome/welcome'
import ProfileView from './profile/profileView'
// import ProfileUpdate from './profile/profileUpdate'
import SearchList from './search/searchList';
import SearchDetail from './search/searchDetail'
import Navbar from './nav/navbar';
import SearchHederForm from './search/searchHeaderForm';
import SearchFilterForm from './search/searchFilterForm';
// import TravelerHistory from './history/travelerHistory'
// import OwnerAllProperties from './ownerDashboard/ownerAllPropertyListing'
// import OwnerSoldProperties from './ownerDashboard/ownerSoldPropertyListing';
// import OwnerPostProperties from './ownerDashboard/ownerPostProperty'
// import ChangeOwnership from './changeOwnership/changeOwnership'

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                {/*
                
                
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login/owner" component={OwnerLogin} />
                <Route exact path="/welcome" component={Welcome} />
                
                <Route exact path="/profile/update" component={ProfileUpdate} /> 
                <Route exact path='/mytrips' component={TravelerHistory}/> 
                <Route exact path='/owner/dashboard/all' component={OwnerAllProperties} />
                <Route exact path='/owner/dashboard/sold' component={OwnerSoldProperties} />
                <Route exact path="/owner/dashboard/post" component={OwnerPostProperties}/>
                <Route exact path="/signup/owner/" component={ChangeOwnership}/>*/}
                <Switch>
                    {/* home component already have embedded nav */}
                    <Route exact path="/"/>
                    <Route path="/login" render={(props) => <Navbar {...props} showMenu={false} />}></Route>
                    {/* For all other route show menu on nav*/}
                    <Route path="/" render={ (props) => <Navbar {...props} showMenu={true} />}/>
                </Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                
                <Route path="/search" render= { (props) => <SearchHederForm {...props} />} />
                <Route exact path="/search/list" component={SearchFilterForm} />
                <Route exact path="/search/list" component={SearchList} />
                <Route exact path='/search/detail' component={SearchDetail} />
                <Route exact path="/profile/view" component={ProfileView} />


            </div>
        )
    }
}
//Export The Main Component
export default Main;