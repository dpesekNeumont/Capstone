import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class UpdateSuccessful extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/Login' />
        }
        return (
            <div className='container'>
                <h3>You Update Was Successful</h3>
            </div>
        )
    }
}
