import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import CreatePatientCall from './ApiControllers/CreatePatientCall'
import GetDoc from './ApiControllers/GetDoctorById'

export default class CreatePatient extends Component {
    constructor(props) {
        super(props)
        this.validateInput = this.validateInput.bind(this)
        this.state = {
            messages: {
                primaryEmail: '',
                secondaryEmail: '',
                primaryPhoneNumber: '',
                secondaryPhoneNumber: '',
                datOfBirth: '',
                primaryState: '',
                secondaryState: '',
                primaryZipCode: '',
                secondaryZipCode: '',
                primaryZipExtension: '',
                secondaryZipExtension: ''
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
            secondaryEmail: '',
            primaryPhonenumber: '',
            secondaryPhonenumber: '',
            primaryStreetAddress: '',
            primaryCity: '',
            primaryState: '',
            primaryZipCode: '',
            primaryZipCodeExtension: '',
            secondaryStreetAddress: '',
            secondaryCity: '',
            secondaryState: '',
            secondaryZipCode: '',
            secondaryZipCodeExtension: '',
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

        //split up the email, phone number and address to make the objects.
        //default the doc to be the only one in the database right now

        let primaryEmail = {}
        let secondaryEmail = {}
        let primaryPhonenumber = {}
        let secondaryPhonenumber = {}
        let primaryAddress = {
            streetAddress: this.state.primaryStreetAddress,
            city: this.state.primaryCity,
            stateAbrev: this.state.primaryState,
            zipCode: this.state.primaryZipCode,
            zipCodeExtension: this.state.primaryZipCodeExtension
        }
        let secondaryAddress = {
            streetAddress: this.state.secondaryStreetAddress,
            city: this.state.secondaryCity,
            stateAbrev: this.state.secondaryState,
            zipCode: this.state.secondaryZipCode,
            zipCodeExtension: this.state.secondaryZipCodeExtension
        }

        if (this.state.primaryEmail.includes('@')) {
            let emailParts = this.state.primaryEmail.split('@')
            primaryEmail = {
                username: emailParts[0],
                domain: emailParts[1]
            }
        }

        if (this.state.secondaryEmail.includes('@')) {
            let emailParts = this.state.secondaryEmail.split('@')
            secondaryEmail = {
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

        if (this.state.secondaryPhonenumber.includes('-')) {
            let phoneParts = this.state.secondaryPhonenumber.split('-')
            secondaryPhonenumber = {
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
                secondaryEmail: secondaryEmail,
                primaryPhoneNumber: primaryPhonenumber,
                secondaryPhoneNumber: secondaryPhonenumber,
                primaryAddress: primaryAddress,
                secondaryAddress: secondaryAddress,
                doctor: this.state.doctor
            })
            .then()
        //calls api and creates paitnent
        //catch not 200 status codes and show a message that something went wrong
    }

    validateInput(event) {
        switch (event.target.name) {
            case 'primaryState':
                this.validatePrimaryState(event.target.value)
                break;
            case 'secondaryState':
                this.validateSecondaryState(event.target.value)
                break;
            case 'primaryZip':
                this.validatePrimaryZipCode(event.target.value)
                break;
            case 'secondaryZip':
                this.validateSecondaryZipCode(event.target.value)
                break;
            case 'primaryZipCodeExtension':
                this.validatePrimaryZipCodeExtension(event.target.value)
                break;
            case 'secondaryZipCodeExtension':
                this.validateSecondaryZipCodeExtension(event.target.value)
                break;
            case 'dob':
                this.validateDateOfBirth(event.target.value)
                break;
            case 'primaryEmail':
                this.validatePrimaryEmail(event.target.value)
                break;
            case 'secondaryEmail':
                this.validateSecondaryEmail(event.target.value)
                break;
            case 'primaryPhoneNumber':
                this.validatePrimaryPhone(event.target.value)
                break;
            case 'secondaryPhoneNumber':
                this.validateSecondaryPhone(event.target.value)
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

    validateSecondaryEmail = (value) => {
        if (!this.state.regexes.emailRegex.test(value)) {
            this.setState({ messages: { secondaryEmail: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { secondaryEmail: '' } })
        }
        this.setState({ secondaryEmail: value })
    }

    validatePrimaryPhone = (value) => {
        if (!this.state.regexes.phoneRegex.test(value)) {
            this.setState({ messages: { primaryPhoneNumber: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryPhoneNumber: '' } })
        }
        this.setState({ primaryPhonenumber: value })
    }

    validateSecondaryPhone = (value) => {
        if (!this.state.regexes.phoneRegex.test(value)) {
            this.setState({ messages: { secondaryPhoneNumber: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { secondaryPhoneNumber: '' } })
        }
        this.setState({ secondaryPhonenumber: value })
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
            this.setState({ messages: { state: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { state: '' } })
        }
        this.setState({ primaryState: value })
    }

    validateSecondaryState = (value) => {
        if (!this.state.regexes.stateRegex.test(value)) {
            this.setState({ messages: { secondaryState: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { secondaryState: '' } })
        }
        this.setState({ secondaryState: value })
    }

    validatePrimaryZipCode = (value) => {
        if (!this.state.regexes.zipRegex.test(value)) {
            this.setState({ messages: { primaryZipCode: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryZipCode: '' } })
        }
        this.setState({ primaryZipCode: value })
    }

    validateSecondaryZipCode = (value) => {
        if (!this.state.regexes.zipRegex.test(value)) {
            this.setState({ messages: { secondaryZipCode: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { secondaryZipCode: '' } })
        }
        this.setState({ secondaryZipCode: value })
    }

    validatePrimaryZipCodeExtension = (value) => {
        if (!this.state.regexes.zipRegex.test(value)) {
            this.setState({ messages: { primaryZipExtension: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryZipExtension: '' } })
        }
        this.setState({ primaryZipCodeExtension: value })
    }

    validateSecondaryZipCodeExtension = (value) => {
        if (!this.state.regexes.zipRegex.test(value)) {
            this.setState({ messages: { secondaryZipExtension: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { secondaryZipExtension: '' } })
        }
        this.setState({ secondaryZipCodeExtension: value })
    }

    handleDocChange = (event) => {
        this.setState({ doctor: GetDoc('http://localhost:8080/doctors', event.target.value) })
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/doctors')
            .then(response => response.json())
            .then(data => this.setState({ doctors: data, doctor: this.state.doctors[0] }))
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

                        <p className='error-message'>{this.state.messages.secondaryEmail}</p>
                        <p>Secondary Email:
                            <input type='email' name='secondaryEmail' className='input-fields' onChange={this.validateInput} />
                        </p>

                        <p className='error-message'>{this.state.messages.primaryPhoneNumber}</p>
                        <p>Primary Phone Number:
                            <input type='text' name='primaryPhoneNumber' className='input-fields' onChange={this.validateInput} />
                        </p>

                        <p className='error-message'>{this.state.messages.secondaryPhoneNumber}</p>
                        <p>Secondary Phone Number:
                            <input type='text' name='secondaryPhoneNumber' className='input-fields' onChange={this.validateInput} />
                        </p>

                        <h4>Primary Address:</h4>
                        <p className='error-message'>{this.state.messages.primaryAddress}</p>
                        <p>Address:
                            <input type='text' className='input-fields' onChange={({ target: { value: primaryStreetAddress } }) => this.setState({ primaryStreetAddress })} value={this.state.primaryStreetAddress} />
                        </p>
                        <p>City:
                            <input type='text' className='input-fields' onChange={({ target: { value: primaryCity } }) => this.setState({ primaryCity })} value={this.state.primaryCity} />
                        </p>
                        <p className='error-message'>{this.state.messages.state}</p>
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

                        <h4>Secondary Address:</h4>
                        <p>Address:
                            <input type='text' className='input-fields' onChange={({ target: { value: secondaryStreetAddress } }) => this.setState({ secondaryStreetAddress })} value={this.state.secondaryStreetAddress} />
                        </p>
                        <p>City:
                            <input type='text' className='input-fields' onChange={({ target: { value: secondaryCity } }) => this.setState({ secondaryCity })} value={this.state.secondaryCity} />
                        </p>
                        <p className='error-message'>{this.state.messages.state}</p>
                        <p>State:
                            <input type='text' name='secondaryState' className='input-fields' onChange={this.validateInput} />
                        </p>
                        <p className='error-message'>{this.state.messages.secondaryZipCode}</p>
                        <p>Zip Code:
                            <input type='text' name='secondaryZip' className='input-fields' onChange={this.validateInput} />
                        </p>
                        <p className='error-message'>{this.state.messages.secondaryZipExtension}</p>
                        <p>Zip Code Extension:
                            <input type='text' name='secondaryZipCodeExtension' className='input-fields' onChange={this.validateInput} />
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

                        <p>Username:  <input type='text' className='input-fields' onChange={({ target: { value: username } }) => this.setState({ username })} value={this.state.username.value} /></p>

                        <p>Password:  <input type='password' className='input-fields' onChange={({ target: { value: password } }) => this.setState({ password })} value={this.state.password.value} /></p>

                        <p>Confirm Password:  <input type='password' className='input-fields' onChange={({ target: { value: confirmedPassword } }) => this.setState({ confirmedPassword })} value={this.state.confirmedPassword.value} /></p>
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
                        <p>You get doctor John Doe while we work out bug</p>
                        <select onChange={this.handleDocChange} value={this.state.currentDoc}>
                            {
                                this.state.doctors.map(function (d) {
                                    return (
                                        <option key={d.id} value={d.id}>{d.firstName} {d.lastName}</option>
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