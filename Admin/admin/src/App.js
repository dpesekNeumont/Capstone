import React from 'react';
import { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';

import Header from './Components/Header'
import Home from './Components/Home'
import Login from './Components/Login'
import ChooseAction from './Components/ChooseAction'
import CreatePatient from './Components/CreatePatient'
import UpdatePatient from './Components/UpdatePatient'
import CreateAppointment from './Components/CreateAppointment'
import UpdateAppointment from './Components/UpdateAppointment'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.reRender = this.reRender.bind(this)
    this.state = {

    }
  }

  reRender(){
    this.setState({})
  }

  componentDidMount = () => {
    localStorage.removeItem('loggedIn')
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header  reRender={this.reRender}/>
          <Route path="/" component={App} >
            <Route exact path="/" component={Home} />
            <Route path="/Login" render={() => <Login reRender={this.reRender}/>} />
            <Route path="/Action" component={ChooseAction}/>
            <Route path="/CreatePatient" component={CreatePatient} />
            <Route path="/UpdatePatient" component={UpdatePatient} />
            <Route path="/CreateAppointment" component={CreateAppointment} />
            <Route path="/UpdateAppointment" component={UpdateAppointment} />
          </Route>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

