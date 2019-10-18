import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class ChooseAction extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    createPatient = () => {
        return <Redirect to='/CreatePatient' />
    }

    updatePatient = () => {
        return <Redirect to='/UpdatePatient' />
    }

    createAppointment = () => {
        return <Redirect to='/CreateAppointment' />
    }

    updateAppointment = () => {
        return <Redirect to='/UpdateAppointment' />
    }

    render() {
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
