import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';

import Login from './Components/Login'
import Board from './Components/Board'
import Header from './Components/Header'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.reRender = this.reRender.bind(this)
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
        <Route path='/'>
          <Route exact path='/Board/Login' render={() => <Login reRender={this.reRender}/>}/>
          <Route path='/Board/Display' component={Board}/> 
        </Route>
      </BrowserRouter>
      </React.Fragment>
    )
  }
}
