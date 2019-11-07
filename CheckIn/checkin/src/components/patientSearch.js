import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class patientSearch extends Component {
    constructor(props) {
        super(props)
        this.pickedPerson = this.pickedPerson.bind(this)
        this.onSearchPatientClicked = this.onSearchPatientClicked.bind(this)
        this.state = {
            patients: [],
            filteredPatients: [],
            firstName: '',
            lastName: '',
            patient: {
                id: 0,
                firstName: '',
                lastName: '',
                primaryEmail: {
                    domain: '',
                    username: ''
                },
                primaryPhoneNumber: {
                    areaCode: '',
                    middleNums: '',
                    lastFour: ''
                }
            }
        }
    }

    onSearchPatientClicked() {
        // let firstName = this.state.firstName
        // let lastName = this.state.lastName
        let matchedPatients = this.state.patients.filter((patient) => {
            return (patient.firstName === this.state.firstName && patient.lastName === this.state.lastName)
        })
        this.setState({ filteredPatients: matchedPatients })
    }

    pickedPerson(pId) {
        this.props.history.push('/CheckIn/Confirmation/' + pId)
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/getAllPatients')
            .then(response => response.json())
            .then(data => this.setState({ patients: data }))
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/Login' />
        } else {
            return (
                <div className='container'>
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
                                            <input type='submit' value='Pick' onClick={() => this.pickedPerson(p.id)} className='create-person-buttons' />
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
        }
    }
}
