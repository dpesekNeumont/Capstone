import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import CreatePatientCall from './ApiControllers/CreatePatientCall'

export default class CreatePatient extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             patient: {
                 firstName: '',
                 lastName: '',
                 middleInitial: '',
                 DateOfBirth: '',
                 username: '',
                 password: '',
                 primaryEmail: {

                 },
                 secondaryEmail: {

                 },
                 primaryPhonenumber : {

                 },
                 secondaryPhonenumber: {

                 },
                 primaryAddress: {

                 },
                 secondaryAddress: {

                 },
                 doctor: {

                 }
             }
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
        return (
            <div className='container'>
                <h2>Create Patient</h2>
                <div className='input-text'>
                    <h3>Personal Information: </h3>
                    <p>First Name:  <input type='text' className='input-fields'/></p>
                    <p>Last Name:  <input type='text'  className='input-fields'/></p>
                    <p>Middle Initial:  <input type='text'  className='input-fields'/></p>
                    <p>Date Of Birth:  <input type='date'  className='input-fields'/></p>
                    <h3>Contact Information: </h3>
                    <p>Primary Email:  <input type='text'  className='input-fields'/></p>
                    <p>Secondary Email:  <input type='text'  className='input-fields'/></p>
                    <p>Primary Address:  <input type='text'  className='input-fields'/></p>
                    <p>Secondary Address:  <input type='text'  className='input-fields'/></p>
                </div>
                <div className='create-person-buttons'>
                    <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                    <input type='submit' value='Create' onClick={this.onCreateClicked} className='create-person-buttons' />
                </div>
            </div>
        )
    }
}
