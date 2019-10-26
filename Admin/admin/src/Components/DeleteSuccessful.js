import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class DeleteSuccessful extends Component {
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
                <h3>Your Delete Happened Successfully</h3>
            </div>
        )
    }
}
