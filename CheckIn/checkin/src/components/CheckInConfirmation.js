import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { DateTime } from 'luxon'

import GetData from './ApiControllers/GetData'
import UpdateData from './ApiControllers/UpdateData'

export default class CheckInConfirmation extends Component {
    constructor(props) {
        super(props)
        this.checkInConfirmed = this.checkInConfirmed.bind(this)

        this.state = {
            record: 0,
            appointments: [],
            noAppointmentMessage: ''
        }
    }

    componentDidMount = () => {
        let record = this.props.match.params.record
        GetData('http://localhost:8080/appointment/patient', record)
            .then(response => this.compareTime(response))
        // this.compareTime(appts)
    }

    compareTime = (appts) => {
        let d = new Date()
        let current = DateTime.fromMillis(d.getTime())
        appts = appts.filter((a) => {
            let guy = DateTime.fromMillis(a.date)
                return (current.month === guy.month && current.day === guy.day && current.year === guy.year && !(a.checkedIn))
        })
        if (appts.length > 0) {
            this.setState({ appointments: appts })
        } else {
            this.setState({ noAppointmentMessage: 'There are no appointments scheduled for today' })
        }
    }

    checkInConfirmed(index) {
        let appt = this.state.appointments[index]
        console.log(appt.checkedIn)
        appt.checkedIn = !appt.checkedIn
        console.log(appt.checkedIn)
        UpdateData('http://localhost:8080/appointment', appt)
        .then(response => {
            if (response.status === 200) {
                localStorage.removeItem('CheckInLoggedIn')
                this.props.history.push('/CheckIn/FinalConfirmation')
            } else {
                this.props.history.push('/CheckIn/Error')
            }
        })
    }

    acknowledgedThing(index) {
        let appt = this.state.appointments[index]
        appt.needsWorkPriorToAppt = !appt.needsWorkPriorToAppt
        UpdateData('http://localhost:8080/appointment', appt)
        .then(response => {
            if (response.status === 200) {
                this.props.history.push('/CheckIn')
            } else {
                this.props.history.push('/CheckIn/Error')
            }
        })
        this.props.history.push('/CheckIn')
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/CheckIn' />
        } else {
            return (
                <div className='container'>
                    <h3>{this.state.noAppointmentMessage}</h3>
                    <div>
                        {
                            this.state.appointments.map((p, index) => {
                                let base = <div className='appointmentInformationDisplay' key={index}>
                                    <p>Date: {DateTime.fromMillis(p.date).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                                    <p>Doctor's Name: {p.doctor.firstName} {p.doctor.lastName}</p>
                                    <p>Patient's Name: {p.patient.firstName} {p.patient.lastName}</p>
                                    <p>Needs Work Prior To Appointment: {`${p.needsWorkPriorToAppt}`}</p>
                                </div>
                                if (p.needsWorkPriorToAppt === false) {
                                    return (
                                        <div key={index + 10}>
                                            {base}
                                            <input type='submit' value='Confirm' onClick={() => this.checkInConfirmed(index)} />
                                        </div>
                                    )
                                } else {

                                    return (
                                        <div key={index + 10}>
                                            <h3>You Must See Either the Pharmacy or Get Labs Done Prior to Your Appointment</h3>
                                            {base}
                                            <input type='submit' value='Acknowledge' onClick={() => this.acknowledgedThing(index)} />
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}
