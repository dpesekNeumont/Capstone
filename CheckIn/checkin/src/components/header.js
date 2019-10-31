import React, { Component } from 'react'
import logo from '../logo.svg';
import {Link} from 'react-router-dom'

import AuthHeader from './AuthHeader'

export default class header extends Component {
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
                    <Link to='/CheckIn' className="nav-link nav-item headLink" >Home</Link>
                    <AuthHeader  reRender={this.props.reRender}/>
                </div>
            </div>
        )
    }
}
