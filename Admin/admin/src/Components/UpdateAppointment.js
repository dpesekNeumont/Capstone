import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class UpdateAppointment extends Component {
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
            <div>
                <p>UpdateAppointment</p>
            </div>
        )
    }
}
