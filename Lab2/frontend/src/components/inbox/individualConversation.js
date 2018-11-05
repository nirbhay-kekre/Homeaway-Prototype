import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class IndividualConversation extends Component {
    render() {
        debugger;
        return (
            <div class="card m-3">
                <Link to={
                    {
                        pathname: "/detail/conversation",
                        state:{
                            conversation: this.props.conversation,
                            to: this.props.with
                        }
                    }} className="text-dark">
                    <div class="card-body">
                        <h5 class="card-title">{this.props.title}</h5>
                        <h6 class="card-text">Conversation with {this.props.with} </h6>
                        <p> click to continue chatting</p>
                    </div>
                </Link>
            </div>
        )
    }
}
