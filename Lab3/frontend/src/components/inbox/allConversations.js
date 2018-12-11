import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getMessageAction } from './../../actions/getMessageAction'
import IndividualConversation from './individualConversation';

class AllConversations extends Component {

    componentWillMount() {
        this.props.getMessageAction()
    }
    render() {
        let loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser)
            loggedInUser = JSON.parse(loggedInUser);
        return (
            <div className="container">
                {this.props.conversations.length == 0 ? <div className ="m-3"><h2>You have no messages</h2></div> :
                    <div>
                    <div className ="m-3"><h2>Your Inbox:</h2></div>
                    <div >{
                        this.props.conversations.map(conversation => {
                            return (<IndividualConversation
                                title={"For property: " + conversation.headline}
                                with={conversation.owner === loggedInUser.username ? conversation.traveler : conversation.owner}
                                conversation={conversation}
                            />)
                        })}</div></div>
                }
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    conversations: state.conversationReducer.conversations,
})

AllConversations.propTypes = {
    getMessageAction: PropTypes.func.isRequired,
    conversations: PropTypes.array.isRequired,

}

export default connect(mapStateToProps, { getMessageAction })(AllConversations);

