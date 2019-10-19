import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class ChooseAction extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    createPatient = () => {
        this.props.history.push('CreatePatient');
    }

    updatePatient = () => {
        this.props.history.push('UpdatePatient');
    }

    createAppointment = () => {
        this.props.history.push('CreateAppointment');
    }

    updateAppointment = () => {
        this.props.history.push('UpdateAppointment');
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/Login' />
        }
        return (
            <div className='container Align-Center'>
                <h3>Choose:</h3>
                <div className='left-side-button'>
                    <input type='submit' value='Create Patient' className='action-button' onClick={this.createPatient} />
                    <input type='submit' value='Update Patient' className='action-button' onClick={this.updatePatient} />
                </div>
                <div className='right-side-button'>
                    <input type='submit' value='Create Appointment' className='action-button' onClick={this.createAppointment} />
                    <input type='submit' value='Update Appointment' className='action-button' onClick={this.updateAppointment} />
                </div>
            </div>
        )
    }
}
