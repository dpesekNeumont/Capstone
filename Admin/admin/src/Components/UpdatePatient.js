import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

export default class UpdatePatient extends Component {
    constructor(props) {
        super(props)
        this.onSearchClicked = this.onSearchClicked.bind(this)
        this.state = {
            firstName: '',
            lastName: '',
            patients: [],
            filteredPatients: []
        }
    }

    onSearchClicked() {
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let matchedPatients = this.state.patients.filter(function(patient) {
            return (patient.firstName === firstName && patient.lastName === lastName)
        })
        console.log(matchedPatients)
        this.setState({filteredPatients: matchedPatients})
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/getAllPatients')
            .then(response => response.json())
            .then(data => this.setState({ patients: data }))
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return <Redirect to='/Login' />
        }
        return (
            <React.Fragment>
                <div className='container'>
                    <h2>Search For Patient: </h2>
                    <div className='input-fields'>
                        <p>First Name:
                            <input type='text' onChange={({ target: { value: firstName } }) => this.setState({ firstName })} value={this.state.firstName} />
                        </p>

                        <p>Last Name:
                            <input type='text' onChange={({ target: { value: lastName } }) => this.setState({ lastName })} value={this.state.lastName} />
                        </p>
                    </div>
                    <div >
                        <input type='submit' value='Search' onClick={this.onSearchClicked} className='create-person-buttons' />
                    </div>
                    <div className='search-results'>
                        <h3>Search Results: </h3>
                        <div>
                            {
                                this.state.filteredPatients.map(function (p, index) {
                                    return (
                                        <Link to={'/UpdatePatient/' + p.id} className='nav-link nav-item' key={index}>
                                            <div className='patientInformationDisplay'>
                                                <p>First Name: {p.firstName}</p>
                                                <p>Last Name: {p.lastName}</p>
                                                <p>Phone Number: {p.primaryPhoneNumber.areaCode}-{p.primaryPhoneNumber.middleNums}-{p.primaryPhoneNumber.lastFour}</p>
                                                {/* 
                                        Date of birth not correctly saving to database, uncomment when that is fixed
                                        <p>Date Of Birth: {new Date(p.dob).toUTCString()}</p> 
                                        */}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
