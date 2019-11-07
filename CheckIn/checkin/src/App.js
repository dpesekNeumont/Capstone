import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';

import Header from './components/header'
import Home from './components/home'
import Login from './components/login'
import PatientSearch from './components/patientSearch'
import CheckInConfirmation from './components/CheckInConfirmation'
import FinalConfirmation from './components/FinalConfirmation'
import ErrorPage from './components/ErrorPage'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  reRender() {
    this.setState({})
  }
  
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
            <Header reRender={this.reRender} />
            <Route path="/CheckIn">
              <Route exact path="/CheckIn" component={Home} />
              <Route exact path="/CheckIn/Login/:option" component={Login}/>
              <Route path="/CheckIn/Staff" component={PatientSearch} />
              <Route path="/CheckIn/Confirmation/:record" component={CheckInConfirmation} />
              <Route path="/CheckIn/FinalConfirmation" component={FinalConfirmation} />
              <Route path="/CheckIn/Error" component={ErrorPage} />
            </Route>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}