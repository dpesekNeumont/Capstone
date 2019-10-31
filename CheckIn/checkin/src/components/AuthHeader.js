import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'

export default class AuthHeader extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    killCookie = () => {
        localStorage.removeItem('CheckInLoggedIn')
        this.props.reRender()
    }
    
    render() {
        if (localStorage.getItem('CheckInLoggedIn') === "true") {
            return (
            <React.Fragment>
                <Link to="/CheckIn" className="nav-link nav-item" onClick={this.killCookie}>Logout</Link>
            </React.Fragment>
            )
        } else {
            return <Redirect to='/CheckIn' />
        }
    }
}
