import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from '../logo.svg';

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className='navbar navbar-dark bg-dark'>
                <div className="row">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Link to='/' className="nav-link nav-item headLink" >Home</Link>
                    <Link to='Login' className="nav-link nav-item headLink" >Login</Link>
                </div>
            </div>
        )
    }
}
