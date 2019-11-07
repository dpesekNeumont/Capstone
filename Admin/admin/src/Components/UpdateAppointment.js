import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { DateTime } from 'luxon'

export default class UpdateAppointment extends Component {
    constructor(props) {
        super(props)
        this.onSearchClicked = this.onSearchClicked.bind(this)
        this.state = {
            allAppts: [],
            filteredAppt: [],
            firstName: '',
            lastName: ''
        }
    }

    onCancelClicked = () => {
        this.props.history.push('Action');
    }

    onSearchClicked() { 
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let matchedAppts = this.state.allAppts.filter(function (appointment) {
            return (appointment.patient.firstName === firstName && appointment.patient.lastName === lastName)
        })
        this.setState({ filteredAppt: matchedAppts })
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/appointment')
            .then(response => response.json())
            .then(data => this.setState({ allAppts: data }))
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/Login' />
        }
        return (
            <div className='container'>
                <h2>Update Appointment</h2>
                <h3>Search For Appointment By Patient:</h3>

                <div className='input-fields'>
                    <p>First Name:
                            <input type='text' onChange={({ target: { value: firstName } }) => this.setState({ firstName })} value={this.state.firstName} />
                    </p>

                    <p>Last Name:
                            <input type='text' onChange={({ target: { value: lastName } }) => this.setState({ lastName })} value={this.state.lastName} />
                    </p>
                </div>
                <div className='create-person-buttons'>
                    <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                    <input type='submit' value='Search' onClick={this.onSearchClicked} className='create-person-buttons' />
                </div>

                <div className='search-results'>
                    <h3>Search Results: </h3>
                    <div>
                        {
                            this.state.filteredAppt.map(function (p, index) {
                                return (
                                    <Link to={'/UpdateAppointment/' + p.id} className='nav-link nav-item' key={index}>
                                        <div className='patientInformationDisplay'>
                                            <p>Date: {DateTime.fromMillis(p.date).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                                            <p>Doctor's Name: {p.doctor.firstName} {p.doctor.lastName}</p>
                                            <p>Patient's Name: {p.patient.firstName} {p.patient.lastName}</p>
                                            <p>Needs Work Prior To Appointment: {`${p.needsWorkPriorToAppt}`}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
