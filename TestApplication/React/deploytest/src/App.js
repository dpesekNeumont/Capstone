import './App.css';
import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './Components/Header.js'
import CreatePerson from './Components/CreatePerson'
import GetPerson from './Components/GetPerson'
import UpdatePerson from './Components/UpdatePerson'
import DeletePerson from './Components/DeletePerson'
import PersonDetails from './Components/PersonDetails'

// api base string
// http://localhost:8080/deployTest

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  reRender() {
    this.setState({})
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <Route path="/DeletePerson" component={DeletePerson} />
          <Route path="/CreatePerson" component={CreatePerson} />
          <Route path="/GetPerson" component={GetPerson} />
          <Route path="/UpdatePerson" component={UpdatePerson} />
          <Route path="/person/:personId" component={PersonDetails} />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}