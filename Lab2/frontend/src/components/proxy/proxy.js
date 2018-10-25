import React, { Component } from 'react'
import { Redirect } from 'react-router';

export default class Proxy extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem("jwtToken") ? "" : <Redirect to="/login" />}
      </div>
    )
  }
}
