import React, { Component } from 'react';
import Navbar from './../nav/navbar'
import './home.css'
import cookie from 'react-cookies';
import axios from 'axios';

class Home extends Component {

    constructor(props){
        super(props)
        this.state={
            searchText: "",
            arrival: null,
            departure: null,
            guests: null,
            redirectTo: null
        }
        this.onBlurDate= this.onBlurDate.bind(this);
        this.onFocusDate= this.onFocusDate.bind(this);
        this.searchTextChangeHandler =this.searchTextChangeHandler.bind(this);
        this.arrivalChangeHandler = this.arrivalChangeHandler.bind(this);
        this.departureChangeHandler = this.departureChangeHandler.bind(this);
        this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
        this.searchResultHandler = this.searchResultHandler.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    searchTextChangeHandler = (e)=>{
        this.setState({
            searchText: e.target.value
        })
    }
    arrivalChangeHandler = (e)=>{
        this.setState({
            arrival: e.target.value
        })
    }
    departureChangeHandler = (e)=>{
        this.setState({
            departure: e.target.value
        })
    }
    guestsChangeHandler = (e)=>{
        this.setState({
            guests: e.target.value
        })
    }
    onFocusDate=(e)=>{
        e.currentTarget.type="date";
    }
    onBlurDate = (e)=>{
        e.currentTarget.type ="text"
    }
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        axios.delete("http://localhost:3001/signout");
        this.setState({});
    }

    searchResultHandler = (e)=>{

    }
    render() {
        let navOptions = [
            {
                title: "Trip boards",
                to: "#",
                dropdown: false,
                button: false
            },
        ];
        let localCookie = cookie.load('cookie');
        if (localCookie) {
            localCookie = JSON.parse(localCookie.substring(2,localCookie.length))
            let name=""
            if(localCookie["firstname"]){
                name= localCookie["firstname"];
            }
            if(localCookie["lastname"]){
                if(name){
                    name+= " "+localCookie["lastname"].charAt(0)+"."
                }else{
                    name=localCookie["lastname"]
                }
            }
            if(!name){
                name="Me"
            }
            navOptions.push( {
                title: name,
                dropdown:[{
                    title: "Inbox",
                    to: "#"
                },{
                    title: "My trips",
                    to: "#"
                },{
                    title: "My profile",
                    to: "#"
                },{
                    title:"Account",
                    to: "#"
                },{
                    title: "Logout",
                    to:"/",
                    onClick: this.handleLogout
                }]
            });
        }else{
            navOptions.push( {
                title: "Login",
                dropdown: [{
                    title: "Traveler login",
                    to: "/login"
                }, {
                    title: "Owner login",
                    to: "/login/owner"
                }],
                button: false
            });
        }
        navOptions.push( {
            title: "Help",
            dropdown: [
                {
                    title: "Visit help center",
                    to: "#",
                },
                {
                    title: "How it Works",
                    to: "#"
                },
                {
                    title: "Security",
                    to: "#"
                }
            ]
        },
        {
            title: "List your property",
            to: "#",
            dropdown: false,
            button: true
        });
        return (
            <div className="home-container">
                <Navbar items={navOptions} logo="white"></Navbar>
                <div className="home-inner">
                    <div className="home-search" style={{ width: "100%", maxWidth: '1020px', margin: "150px 0px 10px 0px"}}>
                        <h1 style={{ color: "#fff"}}>
                            <span>Book beach houses, cabins,</span><br />
                            <span>condos and more, worldwide</span>
                        </h1>

                        <form className="form-horizontal" onSubmit={this.searchResultHandler}>
                            <div className="form-row">
                                <div className="col-4">
                                    <input type="text" className="form-control" id="location" placeholder="Where do you want to go?" onChange={this.searchTextChangeHandler} required />
                                </div>
                                <div className="col-2">
                                    <input type="text" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control" id="arrival" placeholder="Arrive" onChange={this.arrivalChangeHandler} />
                                </div>
                                <div className="col-2">
                                    <input type="text" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control" id="departure" placeholder="Depart" onChange={this.departureChangeHandler}/>
                                </div>
                                <div className="col-2">
                                    <input type="number" className="form-control" min="1" max="9" placeholder="Guests" onChange={this.guestsChangeHandler}/>
                                </div>
                                <div className="col-2">
                                    <button className="btn-primary search-button">Search</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;