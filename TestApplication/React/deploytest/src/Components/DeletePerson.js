import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import personHelper from '../APIControllers/GetPeopleByFirstAndLast'

export default class deleteperosn extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            firstname: '',
            lastname: '',
            searchString: 'http://localhost:8080/person',
            people: []
       }
   }

   handleClick = () => {
        personHelper(this.state.searchString, this.state.firstname, this.state.lastname)
       .then(response => response.json())
       .then(data => this.setState({people: data}, () => {}))
   }
    
    render() {
        return (
            <React.Fragment>
                <div className="container">
                <div className="container">
                    <h3>Delete A Person</h3>
                    <p>First Name:</p>
                    <input type="text" onChange={({target: {value: firstname }})=> this.setState({firstname})} value={this.state.firstname.value}/>
                    <p>Last Name:</p>
                    <input type="text" onChange={({target: {value: lastname }})=> this.setState({lastname})} value={this.state.lastname.value}/>
                    <br/>
                    <input type="submit" onClick={this.handleClick}/>

                    <div className="searchResults">
                        <h3>Search Results:</h3>
                        {
                            this.state.people.map(function(p, index) {
                                return (
                                    <Link to={"/person/" + p.id} className="nav-link-item" key={index}>
                                        <div className="personQuickInfoDisplay">
                                            <p>First Name: {p.firstName}</p>
                                            <p>Last Name: {p.lastName}</p>
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
