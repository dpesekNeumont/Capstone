import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import CreatePatientCall from './ApiControllers/CreateData'
import GetDoc from './ApiControllers/GetDoctorById'

export default class CreatePatient extends Component {
    constructor(props) {
        super(props)
        this.validateInput = this.validateInput.bind(this)
        this.state = {
            messages: {
                primaryEmail: '',
                primaryPhoneNumber: '',
                datOfBirth: '',
                primaryState: '',
                primaryZipCode: '',
                primaryZipExtension: '',
            },
            regexes: {
                emailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                phoneRegex: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
                dateOfBirthRegex: /^\d{4}-\d{2}-\d{2}$/,
                stateRegex: /^[A-Z]{2}$/,
                zipRegex: /^\d{5}$/
            },
            doctors: [],
            currentPage: 'personal',
            currentDoc: 0,
            firstName: '',
            lastName: '',
            middleInitial: '',
            DateOfBirth: '',
            username: '',
            password: '',
            confirmedPassword: '',
            primaryEmail: '',
            primaryPhonenumber: '',
            primaryStreetAddress: '',
            primaryCity: '',
            primaryState: 'AZ',
            primaryZipCode: '',
            primaryZipCodeExtension: '',
            doctor: {
            }
        }
    }

    onNextClicked = () => {
        if (this.state.currentPage === 'personal') {
            this.setState({ currentPage: 'contact' })
        }
        else if (this.state.currentPage === 'contact') {
            this.setState({ currentPage: 'cridentials' })
        }
        else if (this.state.currentPage === 'cridentials') {
            this.setState({ currentPage: 'doctor' })
        }
    }

    onBackClicked = () => {
        if (this.state.currentPage === 'contact') {
            this.setState({ currentPage: 'personal' })
        }
        else if (this.state.currentPage === 'cridentials') {
            this.setState({ currentPage: 'contact' })
        }
        else if (this.state.currentPage === 'doctor') {
            this.setState({ currentPage: 'cridentials' })
        }
    }

    onCreateClicked = () => {
        let apiURL = 'http://localhost:8080/createPatient'
        console.log(this.state.doctor)

        //split up the email, phone number and address to make the objects.
        //default the doc to be the only one in the database right now

        let primaryEmail = {}
        let primaryPhonenumber = {}
        let primaryAddress = {
            streetAddress: this.state.primaryStreetAddress,
            city: this.state.primaryCity,
            stateAbrev: this.state.primaryState,
            zipCode: this.state.primaryZipCode,
            zipCodeExtension: this.state.primaryZipCodeExtension
        }

        if (this.state.primaryEmail.includes('@')) {
            let emailParts = this.state.primaryEmail.split('@')
            primaryEmail = {
                username: emailParts[0],
                domain: emailParts[1]
            }
        }

        if (this.state.primaryPhonenumber.includes('-')) {
            let phoneParts = this.state.primaryPhonenumber.split('-')
            primaryPhonenumber = {
                areaCode: `${phoneParts[0]}`,
                middleNums: `${phoneParts[1]}`,
                lastFour: `${phoneParts[2]}`
            }
        }

        CreatePatientCall(apiURL,
            {
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                middleInitial: this.state.middleInitial,
                dob: this.state.dob,
                primaryEmail: primaryEmail,
                primaryPhoneNumber: primaryPhonenumber,
                primaryAddress: primaryAddress,
                doctor: this.state.doctor
            })
        //calls api and creates paitnent
        //catch not 200 status codes and show a message that something went wrong
    }

    validateInput(event) {
        switch (event.target.name) {
            case 'primaryState':
                this.validatePrimaryState(event.target.value)
                break;
            case 'primaryZip':
                this.validatePrimaryZipCode(event.target.value)
                break;
            case 'primaryZipCodeExtension':
                this.validatePrimaryZipCodeExtension(event.target.value)
                break;
            case 'dob':
                this.validateDateOfBirth(event.target.value)
                break;
            case 'primaryEmail':
                this.validatePrimaryEmail(event.target.value)
                break;
            case 'primaryPhoneNumber':
                this.validatePrimaryPhone(event.target.value)
                break;
            default: this.setState({ [event.target.name]: event.target.value });
        }

    }

    onCancelClicked = () => {
        this.props.history.push('Action');
    }

    validatePrimaryEmail = (value) => {
        if (!this.state.regexes.emailRegex.test(value)) {
            this.setState({ messages: { primaryEmail: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryEmail: '' } })
        }
        this.setState({ primaryEmail: value })
    }

    validatePrimaryPhone = (value) => {
        if (!this.state.regexes.phoneRegex.test(value)) {
            this.setState({ messages: { primaryPhoneNumber: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryPhoneNumber: '' } })
        }
        this.setState({ primaryPhonenumber: value })
    }

    validateDateOfBirth = (value) => {
        if (!this.state.regexes.dateOfBirthRegex.test(value)) {
            this.setState({ messages: { dateOfBirth: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { dateOfBirth: '' } })
        }
        this.setState({ DateOfBirth: value })
    }

    validatePrimaryState = (value) => {
        if (!this.state.regexes.stateRegex.test(value)) {
            this.setState({ messages: { primaryState: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryState: '' } })
        }
        this.setState({ primaryState: value })
    }

    validatePrimaryZipCode = (value) => {
        if (!this.state.regexes.zipRegex.test(value)) {
            this.setState({ messages: { primaryZipCode: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryZipCode: '' } })
        }
        this.setState({ primaryZipCode: value })
    }

    validatePrimaryZipCodeExtension = (value) => {
        if (!this.state.regexes.zipRegex.test(value)) {
            this.setState({ messages: { primaryZipExtension: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryZipExtension: '' } })
        }
        this.setState({ primaryZipCodeExtension: value })
    }

    handleDocChange = (event) => {
        // console.log(event.target.value)
        this.setState({ doctor: GetDoc('http://localhost:8080/doctors', event.target.value) })
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/doctors')
            .then(response => response.json())
            .then(data => {
                this.setState({ doctors: data, doctor: this.state.doctors[0] });
        })
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/Login' />
        }
        if (this.state.currentPage === 'personal') {
            return <React.Fragment>
                <div className='container'>
                    <h2>Create Patient</h2>
                    <div className='input-text'>
                        <h3>Personal Information: </h3>

                        <p>First Name:
                            <input type='text' className='input-fields' onChange={({ target: { value: firstName } }) => this.setState({ firstName })} value={this.state.firstName.value} />
                        </p>

                        <p>Last Name:
                            <input type='text' className='input-fields' onChange={({ target: { value: lastName } }) => this.setState({ lastName })} value={this.state.lastName.value} />
                        </p>

                        <p>Middle Initial:
                            <input type='text' className='input-fields' onChange={({ target: { value: middleInitial } }) => this.setState({ middleInitial })} value={this.state.middleInitial.value} />
                        </p>

                        <p className='error-message'>{this.state.messages.dateOfBirth}</p>
                        <p>Date of Birth (YYYY-MM-DD):
                             <input type='text' name='dob' className='input-fields' onChange={this.validateInput} />
                        </p>
                    </div>
                    <div className='create-person-buttons'>
                        <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                        <input type='submit' value='Next' onClick={this.onNextClicked} className='create-person-buttons' />
                    </div>
                </div>
            </React.Fragment>
        }
        else if (this.state.currentPage === 'contact') {
            return <React.Fragment>
                <div className='container'>
                    <h2>Create Patient</h2>
                    <div className='input-text'>
                        <h3>Contact Information: </h3>

                        <p className='error-message'>{this.state.messages.primaryEmail}</p>
                        <p>Primary Email:
                            <input type='email' name='primaryEmail' className='input-fields' onChange={this.validateInput} />
                        </p>

                        <p className='error-message'>{this.state.messages.primaryPhoneNumber}</p>
                        <p>Primary Phone Number:
                            <input type='text' name='primaryPhoneNumber' className='input-fields' onChange={this.validateInput} />
                        </p>

                        <h4>Primary Address:</h4>
                        <p className='error-message'>{this.state.messages.primaryAddress}</p>
                        <p>Address:
                            <input type='text' className='input-fields' onChange={({ target: { value: primaryStreetAddress } }) => this.setState({ primaryStreetAddress })} value={this.state.primaryStreetAddress} />
                        </p>
                        <p>City:
                            <input type='text' className='input-fields' onChange={({ target: { value: primaryCity } }) => this.setState({ primaryCity })} value={this.state.primaryCity} />
                        </p>
                        <p className='error-message'>{this.state.messages.primaryState}</p>
                        <p>State:
                            <input type='text' name='primaryState' className='input-fields' onChange={this.validateInput} />
                        </p>
                        <p className='error-message'>{this.state.messages.primaryZipCode}</p>
                        <p>Zip Code:
                            <input type='text' name='primaryZip' className='input-fields' onChange={this.validateInput} />
                        </p>
                        <p className='error-message'>{this.state.messages.primaryZipExtension}</p>
                        <p>Zip Code Extension:
                            <input type='text' name='primaryZipCodeExtension' className='input-fields' onChange={this.validateInput} />
                        </p>
                    </div>
                    <div className='create-person-buttons'>
                        <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                        <input type='submit' value='Back' onClick={this.onBackClicked} className='create-person-buttons' />
                        <input type='submit' value='Next' onClick={this.onNextClicked} className='create-person-buttons' />
                    </div>
                </div>
            </React.Fragment>
        }
        else if (this.state.currentPage === 'cridentials') {
            return <React.Fragment>
                <div className='container'>
                    <h2>Create Patient</h2>
                    <div className='input-text'>
                        <h3>Login Information:</h3>

                        <p>Username: 
                             <input type='text' className='input-fields' onChange={({ target: { value: username } }) => this.setState({ username })} value={this.state.username.value} />
                             </p>

                        <p>Password: 
                             <input type='password' className='input-fields' onChange={({ target: { value: password } }) => this.setState({ password })} value={this.state.password.value} />
                             </p>

                        <p>Confirm Password: 
                             <input type='password' className='input-fields' onChange={({ target: { value: confirmedPassword } }) => this.setState({ confirmedPassword })} value={this.state.confirmedPassword.value} />
                             </p>
                    </div>
                    <div className='create-person-buttons'>
                        <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                        <input type='submit' value='Back' onClick={this.onBackClicked} className='create-person-buttons' />
                        <input type='submit' value='Next' onClick={this.onNextClicked} className='create-person-buttons' />
                    </div>
                </div>
            </React.Fragment>
        }
        else if (this.state.currentPage === 'doctor') {
            return <React.Fragment>
                <div className='container'>
                    <h2>Create Patient</h2>
                    <div className='input-text'>
                        <h3>Choose Doctor:</h3>
                        <select onChange={this.handleDocChange} value={this.state.currentDoc}>
                            {
                                this.state.doctors.map(function (d, index) {
                                    return (
                                        <option key={index} value={d.id}>{d.firstName} {d.lastName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='create-person-buttons'>
                        <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                        <input type='submit' value='Back' onClick={this.onBackClicked} className='create-person-buttons' />
                        <input type='submit' value='Finish Creation' onClick={this.onCreateClicked} className='create-person-buttons' />
                    </div>
                </div>
            </React.Fragment>
        }
    }
}