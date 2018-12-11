import React, { Component } from 'react';
import './App.css';
import store from './store'
import { Provider } from 'react-redux'
import Main from './components/main'
import { BrowserRouter } from 'react-router-dom';
import {ApolloService} from './graphql/ApolloClient';
import { ApolloProvider } from 'react-apollo';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={ApolloService}>
          <BrowserRouter>
            <div>
              {/* App Component Has a Child Component called Main*/}
              <Main />
            </div>
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
