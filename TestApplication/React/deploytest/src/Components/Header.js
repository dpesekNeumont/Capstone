import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logo from '../logo.svg'

export default class Header extends Component {
    
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="row">
                <img src={logo} className="App-logo logoSize" alt="logo"/>
                    <Link to="/DeletePerson" className="nav-link nav-item headLink">Remove</Link>
                    <Link to="/CreatePerson" className="nav-link nav-item headLink">Create</Link>
                    <Link to="/GetPerson" className="nav-link nav-item headLink">Get</Link>
                    <Link to="/UpdatePerson" className="nav-link nav-item headLink">Update</Link>
                </div>
            </nav>
        )
    }
}