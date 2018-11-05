import React, { Component } from 'react'
import { connect } from 'react-redux';
import { sendMessageAction } from './../../actions/sendMessageAction'

class DetailConversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: this.props.location.state.conversation,
            to: this.props.location.state.to,
            message: "",
        }
        this.onChange = this.onChange.bind(this);

    }
    onChange = (e) => {
        debugger
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSendMessage = async (e) => {
        e.preventDefault();
        let loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser)
            loggedInUser = JSON.parse(loggedInUser);
        if (this.state.message) {
            let sendingMessage = {
                to: this.state.to,
                from: loggedInUser.username,
                message: this.state.message
            }
            let data = {
                propertyId: this.state.conversation.propertyId,
                owner: this.state.conversation.owner,
                traveler: this.state.conversation.traveler,
                ...sendingMessage
            }

            try {
                await this.props.sendMessageAction(data);
                let updatedConversation = {
                    ...this.state.conversation
                }
                updatedConversation.messages.push(sendingMessage);
                this.setState({
                    conversation: updatedConversation,
                    message:""
                });
            } catch (error) {
                //already handeled in action
            }
        }
    }
    render() {
        return (
            <div className="container">
                <h2 className="mx-3 my-5">Conversation for {this.state.conversation.headline}</h2>
                <div>
                    <h3 className="mx-3">Messages till now:</h3>
                    <div className="bg-light m-3">
                        {
                            this.state.conversation.messages.map(mess => {
                                return (
                                    <div>
                                        <small className={mess.from === this.state.to ? "float-left ml-3 text-primary" : "float-right mr-3  text-dark"}> {mess.from} : </small><br />
                                        <div className={mess.from === this.state.to ? "d-flex justify-content-start ml-3 text-primary" : "d-flex justify-content-end mr-3  text-dark"}>
                                            <h4>{mess.message}</h4>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
                <textarea name="message" value={this.state.message} onChange={this.onChange} className="form-control" rows="5" style={{ resize: "none", }} placeholder="Message"></textarea>
                <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-primary" style={{minWidth:"200px"}} disabled={this.state.message.trim() === ""} onClick={this.handleSendMessage}>Send</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, { sendMessageAction })(DetailConversation);
