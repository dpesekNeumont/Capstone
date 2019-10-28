import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class CreateAppointment extends Component {
    constructor(props) {
        super(props)
        this.onSearchPatientClicked = this.onSearchPatientClicked.bind(this)
        this.onSearchDoctorClicked = this.onSearchDoctorClicked.bind(this)
        this.pickPatientClicked = this.pickPatientClicked.bind(this)
        this.state = {
            currentPage: 'pickPatient',
            patient: {

            },
            doctor: {

            },
            date: '',
            roomNum: -1,
            needsWorkPriorToAppt: false,
            firstName: '',
            lastName: '',
            patients: [],
            filteredPatients: [],
            doctors: [],
            filteredDoctors: []
        }
    }

    onCancelClicked = () => {
        this.props.history.push('Action');
    }

    pickPatientClicked(event) {

        console.log('we here')
    }

    onSearchPatientClicked() {
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let matchedPatients = this.state.patients.filter(function (patient) {
            return (patient.firstName === firstName && patient.lastName === lastName)
        })
        this.setState({ filteredPatients: matchedPatients })
    }

    onSearchDoctorClicked() {
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let matchedDoctors = this.state.doctors.filter(function (doctor) {
            return (doctor.firstName === firstName && doctor.lastName === lastName)
        })
        this.setState({ filteredPatients: matchedDoctors })
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/getAllPatients')
            .then(response => response.json())
            .then(data => this.setState({ patients: data }))
        fetch('http://localhost:8080/doctors')
            .then(response => response.json())
            .then(data => this.setState({ doctors: data }))
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/Login' />
        }
        if (this.state.currentPage === 'pickPatient') {
            return (
                <div className='container'>
                    <h2>Create Appointment</h2>
                    <div>
                        <h3>Search Patient: </h3>
                        <div className='input-fields'>
                            <p>First Name:
                            <input type='text' onChange={({ target: { value: firstName } }) => this.setState({ firstName })} value={this.state.firstName} />
                            </p>

                            <p>Last Name:
                            <input type='text' onChange={({ target: { value: lastName } }) => this.setState({ lastName })} value={this.state.lastName} />
                            </p>
                        </div>
                        <div className='actions'>
                            <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                            <input type='submit' value='Search' onClick={this.onSearchPatientClicked} className='create-person-buttons' />
                        </div>
                        <div className='search-results'>
                            <h3>Search Results: </h3>
                            <div>
                                {
                                    this.state.filteredPatients.map((p, index) => {
                                        return (
                                            <div className='information-display' key={index}>
                                                <p>First Name: {p.firstName}</p>
                                                <p>Last Name: {p.lastName}</p>
                                                <p>Phone Number: {p.primaryPhoneNumber.areaCode}-{p.primaryPhoneNumber.middleNums}-{p.primaryPhoneNumber.lastFour}</p>
                                                <p>Email: {p.primaryEmail.username}@{p.primaryEmail.domain}</p>
                                                <input type='submit' value='Pick' onClick={this.pickPatientClicked} className='create-person-buttons' />
                                                {/* 
                                        Date of birth not correctly saving to database, uncomment when that is fixed
                                        <p>Date Of Birth: {new Date(p.dob).toUTCString()}</p> 
                                        */}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.currentPage === 'PickDoctor') {
            return (
                <div className='container'>
                    <h3>Search Doctor: </h3>
                    <div className='input-fields'>
                        <p>First Name:
                            <input type='text' onChange={({ target: { value: firstName } }) => this.setState({ firstName })} value={this.state.firstName} />
                        </p>

                        <p>Last Name:
                            <input type='text' onChange={({ target: { value: lastName } }) => this.setState({ lastName })} value={this.state.lastName} />
                        </p>
                    </div>
                    <div className='actions'>
                        <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                        <input type='submit' value='Search' onClick={this.onSearchDoctorClicked} className='create-person-buttons' />
                    </div>
                    <div className='search-results'>
                        <h3>Search Results: </h3>
                        <div>
                            {
                                this.state.filteredPatients.map((p, index) => {
                                    return (
                                        <div className='information-display' key={index}>
                                            <p>First Name: {p.firstName}</p>
                                            <p>Last Name: {p.lastName}</p>
                                            <p>Phone Number: {p.primaryPhoneNumber.areaCode}-{p.primaryPhoneNumber.middleNums}-{p.primaryPhoneNumber.lastFour}</p>
                                            <p>Email: {p.primaryEmail.username}@{p.primaryEmail.domain}</p>
                                            <input type='submit' value='Pick' onClick={this.pickPatientClicked} className='create-person-buttons' />
                                            {/* 
                                        Date of birth not correctly saving to database, uncomment when that is fixed
                                        <p>Date Of Birth: {new Date(p.dob).toUTCString()}</p> 
                                        */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.currentPage === 'PickDate') {
            return (
                <div className='container'>
                    <h3>Select Appointment Time:</h3>
                </div>
            )
        }
    }
}
