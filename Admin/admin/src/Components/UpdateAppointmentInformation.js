import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {DateTime} from 'luxon'

import UpdateData from './ApiControllers/UpdateData'
import GetData from './ApiControllers/GetData'
import DeleteData from './ApiControllers/deleteData'

export default class UpdateAppointmentInformation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointments: [],
            appt: {
                id: 0,
                patient: {},
                doctor: {},
                date: 0,
                roomNum: 0,
                needsWorkPriorToAppt: false
            },
            date: '',
            needsWorkPriorToAppt: false
        }
    }

    onCancelClicked = () => {
        this.props.history.push('Action')
    }

    onDeleteClicked = () => {
        DeleteData('http://localhost:8080/appointment', this.state.appt.id)
    }

    componentDidMount = () => {
        let value = this.props.match.params.appointment
        GetData('http://localhost:8080/appointment', value)
            .then(response => this.setState({ appt: response }))
    }

    needsWorkChanged = (event) => {
        this.setState({needsWorkPriorToAppt: event.target.checked})
    }

    OnUpdateClicked = () => {
        let date =  DateTime.fromISO(this.state.date).valueOf()
        let appt = this.state.appt
        appt.date = date
        appt.needsWorkPriorToAppt = this.state.needsWorkPriorToAppt
        UpdateData('http://localhost:8080/appointment', appt)
        .then(response => {
            if (response.status === 200) {
                this.props.history.push('/UpdateSuccessful')
            } else {
                console.log('something broke')
            }
        })
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/Login' />
        }
        return (
            <div className='container'>
                <h3>Update Appointment Information</h3>
                <div className='updateView'>
                    <div className='horizontal'>
                        <p>Patient: </p>
                        <p>{this.state.appt.patient.firstName} {this.state.appt.patient.lastName}</p>
                    </div>
                    <div className='horizontal'>
                        <p>Doctor: </p>
                        <p>{this.state.appt.doctor.firstName} {this.state.appt.doctor.lastName}</p>
                    </div>
                    <div className='horizontal'>
                        <p>Date: </p>
                        <input type='datetime-local' onChange={({ target: { value: date } }) => this.setState({ date })} value={this.state.date} />
                    </div>
                    <div className='horizontal'>
                        <p>Needs Work Prior To Appointment: </p>
                        <input type='checkbox' onChange={this.needsWorkChanged} />
                    </div>
                </div>
                <div className='create-person-buttons'>
                    <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                    <input type='submit' value='Delete' onClick={this.onDeleteClicked} className='create-person-buttons' />
                    <input type='submit' value='Submit Changes' onClick={this.OnUpdateClicked} className='create-person-buttons' />
                </div>
            </div>
        )
    }
}
