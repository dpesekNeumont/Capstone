import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { DateTime } from 'luxon'

import getPatient from './ApiControllers/getPatientById'
import getDoctor from './ApiControllers/GetDoctorById'
import createData from './ApiControllers/CreateData'

export default class CreateAppointment extends Component {
    constructor(props) {
        super(props)
        this.onSearchPatientClicked = this.onSearchPatientClicked.bind(this)
        this.onSearchDoctorClicked = this.onSearchDoctorClicked.bind(this)
        this.pickedPerson = this.pickedPerson.bind(this)
        this.needsWorkChanged = this.needsWorkChanged.bind(this)
        this.state = {
            pages: {
                patient: 'pickPatient',
                doctor: 'pickDoctor',
                date: 'PickDate',
                confirmation: 'confirmation'
            },
            currentPage: 'pickPatient',
            patient_id: -1,
            patient: {},
            doctor_id: -1,
            doctor: {},
            date: '',
            dateLong: 0,
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

    pickedPerson(name, id) {
        this.setState({ firstName: '', lastName: '' })
        if (name === this.state.pages.patient) {
            this.setState({ patient_id: id, currentPage: this.state.pages.doctor })
            this.setPatientById(id);
        } else if (name === this.state.pages.doctor) {
            this.setState({ doctor_id: id, currentPage: this.state.pages.date })
            this.setDoctorById(id);
        }
    }

    setPatientById = (id) => {
        getPatient('http://localhost:8080/getPatient', id)
        .then(response => this.setState({patient: response}))
    }

    setDoctorById = (id) => {
        getDoctor('http://localhost:8080/doctors', id)
        .then(response => this.setState({doctor: response}))
    }

    backPressed = () => {
        if (this.state.currentPage === this.state.pages.date) {
            this.setState({ currentPage: this.state.pages.doctor })
        } else if (this.state.currentPage === this.state.pages.doctor) {
            this.setState({ currentPage: this.state.pages.patient })
        } else if (this.state.currentPage === this.state.pages.patient) {
            this.props.history.push('Action');
        }
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
        this.setState({ filteredDoctors: matchedDoctors })
    }

    needsWorkChanged(event) {
        this.setState({ needsWorkPriorToAppt: event.target.checked })
    }

    pickedAppointmentDetails = () => {
        let stuff = DateTime.fromISO(this.state.date).valueOf()
        this.setState({ dateLong: stuff, currentPage: this.state.pages.confirmation })
    }

    cancelConfirmationClicked = () => {
        this.setState({currentPage: this.state.pages.date})
    }

    confirmationSubmitClicked = () => {
        let patient = {
            id: this.state.patient_id,
            firstName:this.state.patient.firstName,
            lastName: this.state.patient.lastName,
            dob: this.state.patient.dob,
            primaryEmail: this.state.patient.primaryEmail,
            primaryPhoneNumber: this.state.patient.primaryPhoneNumber,
            doctor: this.state.doctor
        }
        let doctor = {
            id: this.state.doctor_id,
            clinic: this.state.doctor.clinic,
            firstName:this.state.doctor.firstName,
            lastName: this.state.doctor.lastName,
            primaryEmail: this.state.doctor.primaryEmail,
            primaryPhoneNumber: this.state.doctor.primaryPhoneNumber
        }
        let appt = {
            patient: patient,
            doctor: doctor,
            date: this.state.dateLong,
            roomNum: this.state.roomNum,
            needsWorkPriorToAppt: this.state.needsWorkPriorToAppt
        }
        // console.log(JSON.stringify(appt.doctor))
        // console.log(JSON.stringify(appt.patient))
        createData('http://localhost:8080/appointment', appt)
        .then(response => {
            if (response.status === 200) {
                // go to appointment created page
            } else {
                // Go to appointment did not create successfully page
            }
        })
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
        if (this.state.currentPage === this.state.pages.patient) {
            return <React.Fragment>
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
                                                <input type='submit' value='Pick' onClick={() => this.pickedPerson(this.state.pages.patient, p.id)} className='create-person-buttons' />
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
            </React.Fragment>
        } else if (this.state.currentPage === this.state.pages.doctor) {
            return <React.Fragment>
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
                                this.state.filteredDoctors.map((p, index) => {
                                    return (
                                        <div className='information-display' key={index}>
                                            <p>First Name: {p.firstName}</p>
                                            <p>Last Name: {p.lastName}</p>
                                            <p>Phone Number: {p.primaryPhoneNumber.areaCode}-{p.primaryPhoneNumber.middleNums}-{p.primaryPhoneNumber.lastFour}</p>
                                            <p>Email: {p.primaryEmail.username}@{p.primaryEmail.domain}</p>
                                            <input type='submit' value='Pick' onClick={() => this.pickedPerson(this.state.pages.doctor, p.id)} className='create-person-buttons' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        } else if (this.state.currentPage === this.state.pages.date) {
            return <React.Fragment>
                <div className='container'>
                    <h3>Appointment Details:</h3>
                    <p>Appointment Date/Time: <input type='datetime-local' onChange={({ target: { value: date } }) => this.setState({ date })} value={this.state.date} /></p>
                    <div className='horizontal'>
                        <p>Needs Work Prior To Appointment:</p>
                        <input type='checkbox' onChange={this.needsWorkChanged} />
                    </div>
                    <div className='actions'>
                        <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                        <input type='submit' value='Submit' onClick={this.pickedAppointmentDetails} className='create-person-buttons' />
                    </div>
                </div>
            </React.Fragment>
        } else if (this.state.currentPage === this.state.pages.confirmation) {
            return <React.Fragment>
                <div className='container'>
                    <h2>Confirm Appointment Information</h2>
                    <h4>Patient Information: </h4>
                    <p>Name: {this.state.patient.firstName} {this.state.patient.lastName}</p>
                    <p>Phone Number: {this.state.patient.primaryPhoneNumber.areaCode}-{this.state.patient.primaryPhoneNumber.middleNums}-{this.state.patient.primaryPhoneNumber.lastFour}</p>
                    <p>Email: {this.state.patient.primaryEmail.username}@{this.state.patient.primaryEmail.domain}</p>
                    {/* Address stuff here when fixed */}

                    <h4>Doctor Information: </h4>
                    <p>Name: {this.state.doctor.firstName} {this.state.doctor.lastName}</p>
                    
                    <h4>Appointment Information:</h4>
                    <p>Appointment Time: {DateTime.fromMillis(this.state.dateLong).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                    <p>Needs Work Prior To Appointment: {`${this.state.needsWorkPriorToAppt}`}</p>

                    <div className='actions'>
                        <input type='submit' value='Back' onClick={this.cancelConfirmationClicked} className='create-person-buttons' />
                        <input type='submit' value='Submit' onClick={this.confirmationSubmitClicked} className='create-person-buttons' />
                    </div>
                </div>
            </React.Fragment>
        }
    }
}