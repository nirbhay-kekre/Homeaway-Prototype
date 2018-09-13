import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { FormGroup, Button, ControlLabel, FormControl, HelpBlock, ButtonGroup } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: ""
    }
    this.expressionChangeHandler =this.expressionChangeHandler.bind(this);
    this.calculateHandler=this.calculateHandler.bind(this);
    this.digitOrOperationChangeHandler=this.digitOrOperationChangeHandler.bind(this);
    this.resetHandler=this.resetHandler.bind(this);
  }

  expressionChangeHandler = (e) => {
    this.setState({
      expression: e.target.value
    });
  }

  digitOrOperationChangeHandler = (e) =>{
    this.setState({
      expression: this.state.expression + e.target.value
    })
  }
  resetHandler = (e) => {
    this.setState({
      expression: ""
    });
  }

  calculateHandler = (e) => {
    e.preventDefault();
    let expression = {
      expression: this.state.expression
    }
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:3030/calculate", expression).then(res => {
        if (res.status === 200) {
          this.setState({
            expression: res.data.result
          })
        } else {
          this.setState({
            expression: "Error occurred!"
          })
        }
      })
  }


  render() {
    return (
      <div className="App">
        <h1>Calculator</h1>
        <form >
          <FormGroup controlId="expression">
            <ControlLabel>Output/Input:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.expression}
              placeholder="Type you input expression here"
              onChange={this.expressionChangeHandler}
            />
            <HelpBlock>Enter a valid arithmetic expression e.g 2+4*3 </HelpBlock>
            
            <ButtonGroup>
              <Button bsStyle="primary" value="1" onClick={this.digitOrOperationChangeHandler}> 1 </Button>
              <Button bsStyle="primary" value="2" onClick={this.digitOrOperationChangeHandler}> 2 </Button>
              <Button bsStyle="primary" value="3" onClick={this.digitOrOperationChangeHandler}> 3 </Button>
              <Button bsStyle="primary" value="+" onClick={this.digitOrOperationChangeHandler}> + </Button>
            </ButtonGroup>
            <br/>
            <ButtonGroup>
              <Button bsStyle="primary" value="4" onClick={this.digitOrOperationChangeHandler}> 4 </Button>
              <Button bsStyle="primary" value="5" onClick={this.digitOrOperationChangeHandler}> 5 </Button>
              <Button bsStyle="primary" value="6" onClick={this.digitOrOperationChangeHandler}> 6 </Button>
              <Button bsStyle="primary" value="-" onClick={this.digitOrOperationChangeHandler}> - </Button>
            </ButtonGroup>
            <br/>
            <ButtonGroup>
              <Button bsStyle="primary" value="7" onClick={this.digitOrOperationChangeHandler}> 7 </Button>
              <Button bsStyle="primary" value="8" onClick={this.digitOrOperationChangeHandler}> 8 </Button>
              <Button bsStyle="primary" value="9" onClick={this.digitOrOperationChangeHandler}> 9 </Button>
              <Button bsStyle="primary" value="*" onClick={this.digitOrOperationChangeHandler}> * </Button>
            </ButtonGroup>
            
            <br/>
            <ButtonGroup>
            <Button bsStyle="primary" value="0" onClick={this.digitOrOperationChangeHandler}> 0 </Button>
            <Button bsStyle="primary" value="/" onClick={this.digitOrOperationChangeHandler}> / </Button>
          </ButtonGroup>
          <br/>
            <Button bsStyle="success" onClick={this.calculateHandler}> Answer </Button>
            <Button bsStyle="danger" onClick={this.resetHandler}> Clear </Button>
            
       
          </FormGroup>

        </form>
      </div>
    );
  }
}

export default App;
