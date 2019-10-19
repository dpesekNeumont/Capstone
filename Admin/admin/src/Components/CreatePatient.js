import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import CreatePatientCall from './ApiControllers/CreatePatientCall'

export default class CreatePatient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 'personal',
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
        //calls api and creates paitnent
        //catch not 200 status codes and show a message that something went wrong
    }

    onCancelClicked = () => {
        this.props.history.push('Action');
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
                        <p>Primary Email:  <input type='text' className='input-fields' onChange={({ target: { value: primaryEmail } }) => this.setState({ primaryEmail })} value={this.state.primaryEmail.value} /></p>
                        <p>Secondary Email:  <input type='text' className='input-fields' onChange={({ target: { value: secondaryEmail } }) => this.setState({ secondaryEmail })} value={this.state.secondaryEmail.value} /></p>
                        <p>Primary Phone Number:  <input type='text' className='input-fields' onChange={({ target: { value: primaryPhonenumber } }) => this.setState({ primaryPhonenumber })} value={this.state.primaryPhonenumber.value} /></p>
                        <p>Secondary Phone Number:  <input type='text' className='input-fields' onChange={({ target: { value: secondaryPhonenumber } }) => this.setState({ secondaryPhonenumber })} value={this.state.secondaryPhonenumber.value} /></p>
                        <p>Primary Address:  <input type='text' className='input-fields' onChange={({ target: { value: primaryAddress } }) => this.setState({ primaryAddress })} value={this.state.primaryAddress.value} /></p>
                        <p>Secondary Address:  <input type='text' className='input-fields' onChange={({ target: { value: secondaryAddress } }) => this.setState({ secondaryAddress })} value={this.state.secondaryAddress.value} /></p>
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
                        <p>This will be a display with all doctors to pick from</p>
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
