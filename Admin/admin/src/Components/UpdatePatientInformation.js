import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import deletePatient from './ApiControllers/deleteData'
import getPatient from './ApiControllers/GetData'
import UpdatePatient from './ApiControllers/UpdateData'

export default class UpdatePatientInformation extends Component {
    constructor(props) {
        super(props)
        this.onValueChanged = this.onValueChanged.bind(this)
        this.state = {
            messages: {
                primaryEmail: '',
                primaryPhoneNumber: ''
            },
            regexes: {
                emailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                phoneRegex: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
            },
            patient: {
            },
            newPatient: {
                id: 0,
                firstName: '',
                lastName: '',
                primaryPhoneNumber: {
                },
                primaryEmail: {
                }
            },
            email: '',
            phoneNumber: '',
            address: ''
        }
    }

    onCancelClicked = () => {
        console.log('cancelled')
        this.props.history.push('/UpdatePatient');
    }

    onDeleteClicked = () => {
        deletePatient('http://localhost:8080/deletePatient', this.state.patient.id)
        .then(response => {
            if (response.status === 200) {
                this.props.history.push('/DeleteSuccessful')
            }
        })
    }

    onSubmitClicked = () => {
        if ((this.state.regexes.phoneRegex.test(this.state.phoneNumber))
            && (this.state.regexes.emailRegex.test(this.state.email))) {
                let phoneParts = this.state.phoneNumber.split('-')
                let emailParts = this.state.email.split('@')
                let primaryEmail = {
                    username: emailParts[0],
                    domain: emailParts[1]
                }
                let primaryPhoneNumber = {
                    areaCode: phoneParts[0],
                    middleNums: phoneParts[1],
                    lastFour: phoneParts[2]
                }
                this.setState({newPatient: {primaryEmail: primaryEmail, primaryPhoneNumber: primaryPhoneNumber,
                        id: this.state.patient.id, firstName: this.state.patient.firstName, lastName: this.state.patient.lastName,
                        privaryAddress: this.state.patient.privaryAddress, username: this.state.patient.username, 
                        password: this.state.patient.password, doctor: this.state.patient.doctor}}, 
                    () => {
                        console.log(this.state.newPatient)
                        UpdatePatient('http://localhost:8080/updatePatient', this.state.newPatient)
                        .then(response => {
                            if (response.status === 200) {
                                this.props.history.push('/UpdateSuccessful')
                            }
                        })
                    })
            } 
        
    }

    validatePhoneNumber = (value) => {
        if (!this.state.regexes.phoneRegex.test(value)) {
            this.setState({messages : {primaryPhoneNumber: 'This Field Is Invalid'}})
        } else {
            this.setState({messages: {primaryPhoneNumber: ''}})
        }
        this.setState({phoneNumber: value})
    }

    validateEmail = (value) => {
        if (!this.state.regexes.emailRegex.test(value)) {
            this.setState({messages : {primaryEmail: 'This Field Is Invalid'}})
        } else {
            this.setState({messages: {primaryEmail: ''}})
        }
        this.setState({email: value})
    }

    onValueChanged(event) {
        switch (event.target.name) {
            case 'phoneNumber':
                this.validatePhoneNumber(event.target.value)
                break;
            case 'emailAddress':
                this.validateEmail(event.target.value)
                break;
            default:
                break;
        }
    }

    componentDidMount = () => {
        let id = this.props.match.params.patientId
        getPatient('http://localhost:8080/getPatient', id)
        .then(response => this.setState({patient: response}))
        .then(() => {
            let email = this.state.patient.primaryEmail;
            let myGuy = this.state.patient.primaryPhoneNumber;
            if ((email !== null && email !== undefined) && (myGuy !== null && myGuy !== undefined)) {
                this.setState({email: email.username+'@'+email.domain, phoneNumber: myGuy.areaCode+'-'+myGuy.middleNums+'-'+myGuy.lastFour})
            }
        })

    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/Login' />
        }
        return (
            <div className='container'>
                <h3>Update Patient Information: </h3>
                <div className='information-display'>
                <p>Name: {this.state.patient.firstName} {this.state.patient.middlenitial} {this.state.patient.lastName}</p>

                <p className='error-message'>{this.state.messages.primaryEmail}</p>
                <p>Email: <input type='text' name='emailAddress' onChange={this.onValueChanged} placeholder={this.state.email}/></p>

                <p className='error-message'>{this.state.messages.primaryPhoneNumber}</p>
                <p>Phone Number: <input type='text' name='phoneNumber' onChange={this.onValueChanged} placeholder={this.state.phoneNumber} /></p>
                </div>
                <div className='create-person-buttons'>
                    <input type='submit' value='Cancel' onClick={this.onCancelClicked} className='create-person-buttons' />
                    <input type='submit' value='Delete' onClick={this.onDeleteClicked} className='create-person-buttons' />
                    <input type='submit' value='Submit Changes' onClick={this.onSubmitClicked} className='create-person-buttons' />
                </div>
            </div>
        )
    }
}
