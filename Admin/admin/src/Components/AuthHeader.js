import React, { Component } from 'react'

import {Link} from 'react-router-dom'

export default class AuthHeader extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    killCookie = () => {
        localStorage.removeItem('loggedIn')
        this.props.reRender()
    }
    
    render() {
        if (localStorage.getItem('loggedIn') === "true") {
            return (
            <React.Fragment>
                <Link to="/Home" className="nav-link nav-item" onClick={this.killCookie}>Logout</Link>
            </React.Fragment>
            )
        } else {
        return (
            <React.Fragment>
                <Link to="/login" className="nav-link nav-item headLink">Login</Link>
            </React.Fragment>
        )
        }
    }
}
