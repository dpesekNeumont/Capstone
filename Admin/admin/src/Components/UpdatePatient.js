import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

export default class UpdatePatient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            patients: []
        }
    }

    firstNameChange = () => {

    }

    lastNameChange = () => {

    }

    onSearchClicked = () => {

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
                    <input type='submit' value='Search' onClick={this.onSearchClicked} className='create-person-buttons'/>
                </div>
                <div className='search-results'>
                    <h3>Search Results: </h3>
                    <div>
                        {
                            this.state.patients.map(function(p, index) {
                                return (
                                <Link to={'/UpdatePatient/' + p.id} className='nav-link nav-item' key={index}>
                                    <div classname='patientInformationDisplay'>
                                        <p>First Name: {p.firstName}</p>
                                        <p>Last Name: {p.lastName}</p>
                                        {/* <p>Date Of Birth: {new Date(p.dob).toUTCString()}</p> */}
                                    </div>
                                </Link>
                            )})
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
}
