import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import CreatePatientCall from './ApiControllers/CreatePatientCall'

export default class CreatePatient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: {
                primaryEmail: '',
                secondaryEmail: '',
                primaryPhoneNumber: '',
                secondaryPhoneNumber: ''
            },
            regexes: {
                emailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                phoneRegex: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
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
            primaryAddress: '',
            secondaryAddress: '',
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
        let apiURL = 'http://localhost:8080/'

        //split up the email, phone number and address to make the objects.
        //default the doc to be the only one in the database right now

        let primaryEmail = {}
        let secondaryEmail = {}
        let primaryPhonenumber = {}
        let secondaryPhonenumber = {}

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
                areaCode: phoneParts[0],
                middleNums: [1],
                lastFour: [2]
            }
        }

        if (this.state.secondaryPhonenumber.includes('-')) {
            let phoneParts = this.state.secondaryPhonenumber.split('-')
            secondaryPhonenumber = {
                areaCode: phoneParts[0],
                middleNums: [1],
                lastFour: [2]
            }
        }

        CreatePatientCall(apiURL, 
            { firstName: this.state.firstName, lastName: this.state.lastName, 
                middleInitial: this.state.middleInitial, dob: this.state.dob, 
                primaryEmail: primaryEmail, secondaryEmail: secondaryEmail, 
                primaryPhoneNumber: primaryPhonenumber, secondaryPhoneNumber: secondaryPhonenumber, 
                doctor: this.state.doctor })
        //calls api and creates paitnent
        //catch not 200 status codes and show a message that something went wrong
    }

    onCancelClicked = () => {
        this.props.history.push('Action');
    }

    validatePrimaryEmail = () => {
        if (!this.state.regexes.emailRegex.test(this.state.primaryEmail)) {
            this.setState({ messages: { primaryEmail: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryEmail: '' } })
        }
    }

    validateSecondaryEmail = () => {
        if (!this.state.regexes.emailRegex.test(this.state.secondaryEmail)) {
            this.setState({ messages: { secondaryEmail: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { secondaryEmail: '' } })
        }
    }

    validatePrimaryPhone = () => {
        if (!this.state.regexes.phoneRegex.test(this.state.primaryPhonenumber)) {
            this.setState({ messages: { primaryPhoneNumber: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { primaryPhoneNumber: '' } })
        }
    }

    validateSecondaryPhone = () => {
        if (!this.state.regexes.phoneRegex.test(this.state.secondaryPhonenumber)) {
            this.setState({ messages: { secondaryPhoneNumber: 'This Field Is Invalid' } })
        } else {
            this.setState({ messages: { secondaryPhoneNumber: '' } })
        }
    }

    handleDocChange = (id) => {
        this.setState({ currentDoc: id })
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/doctors')
            .then(response => response.json())
            .then(data => this.setState({ doctors: data }))
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

                        <p>First Name:  <input type='text' className='input-fields' onChange={({ target: { value: firstName } }) => this.setState({ firstName })} value={this.state.firstName.value} /></p>

                        <p>Last Name:  <input type='text' className='input-fields' onChange={({ target: { value: lastName } }) => this.setState({ lastName })} value={this.state.lastName.value} /></p>

                        <p>Middle Initial:  <input type='text' className='input-fields' onChange={({ target: { value: middleInitial } }) => this.setState({ middleInitial })} value={this.state.middleInitial.value} /></p>

                        <p>Date Of Birth:  <input type='date' className='input-fields' onChange={({ target: { value: DateOfBirth } }) => this.setState({ DateOfBirth })} value={this.state.DateOfBirth.value} /></p>
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
                        <p>Primary Email:  <input type='email' className='input-fields' onChange={({ target: { value: primaryEmail } }) => this.setState({ primaryEmail }, this.validatePrimaryEmail)} value={this.state.primaryEmail.value} /></p>

                        <p className='error-message'>{this.state.messages.secondaryEmail}</p>
                        <p>Secondary Email:  <input type='email' className='input-fields' onChange={({ target: { value: secondaryEmail } }) => this.setState({ secondaryEmail }, this.validateSecondaryEmail)} value={this.state.secondaryEmail.value} /></p>

                        <p className='error-message'>{this.state.messages.primaryPhoneNumber}</p>
                        <p>Primary Phone Number:  <input type='text' className='input-fields' onChange={({ target: { value: primaryPhonenumber } }) => this.setState({ primaryPhonenumber }, this.validatePrimaryPhone)} value={this.state.primaryPhonenumber.value} /></p>

                        <p className='error-message'>{this.state.messages.secondaryPhoneNumber}</p>
                        <p>Secondary Phone Number:  <input type='text' className='input-fields' onChange={({ target: { value: secondaryPhonenumber } }) => this.setState({ secondaryPhonenumber }, this.validateSecondaryPhone)} value={this.state.secondaryPhonenumber.value} /></p>

                        <h4>Primary Address:</h4>
                        <p>Address Line 1:  <input type='text' className='input-fields' onChange={({ target: { value: primaryAddress } }) => this.setState({ primaryAddress })} value={this.state.primaryAddress.value} /></p>

                        <h4>Secondary Address:</h4>
                        <p>Address Line 1:  <input type='text' className='input-fields' onChange={({ target: { value: secondaryAddress } }) => this.setState({ secondaryAddress })} value={this.state.secondaryAddress.value} /></p>
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

                        <p>Password:  <input type='text' className='input-fields' onChange={({ target: { value: password } }) => this.setState({ password })} value={this.state.password.value} /></p>

                        <p>Confirm Password:  <input type='text' className='input-fields' onChange={({ target: { value: confirmedPassword } }) => this.setState({ confirmedPassword })} value={this.state.confirmedPassword.value} /></p>
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
            //get all doctors into a displayable array.
            //pick one
            return <React.Fragment>
                <div className='container'>
                    <h2>Create Patient</h2>
                    <div className='input-text'>
                        <h3>Choose Doctor:</h3>
                        <p>You get doctor John Doe while we work out bug</p>
                        {/* {
                            this.state.doctors.map(function (d, index) {
                                console.log(this)
                                return (
                                    <label key={index}>
                                        <input type='radio' className="nav-link nav-item" value={d.firstName} onChange={() => this.handleDocChange(d.id)} />
                                    </label>
                                )
                            })} */}
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
