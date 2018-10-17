import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store from './store'
import { Provider } from 'react-redux'
import Main from './components/main'
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        
        <BrowserRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
