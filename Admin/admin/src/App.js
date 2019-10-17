import React from 'react';
import { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';

import Header from './Components/Header'
import Home from './Components/Home'
import Login from './Components/Login'

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

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header  reRender={this.reRender}/>
          <Route path="/" component={App} >
            <Route exact path="/" component={Home} />
            <Route path="/Login" render={() => <Login reRender={this.reRender}/>} />

          </Route>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

