import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class deleteperosn extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            firstname: '',
            lastname: '',
            searchString: 'http://localhost:8080/deployTest/person',
            people: []
       }
   }

   handleClick = () => {
       fetch(this.state.searchString + this.state.firstname + this.state.lastname)
       .then(response => response.json())
       .then(data => this.setState({people: data}, () => {}))
   }
    
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h3>Delete A Person</h3>
                    <p>First Name:</p>
                    <input type="text" />
                    <p>Last Name:</p>
                    <input type="text" />
                    <br/>
                    <input type="submit" />

                    <div className="searchResults">
                        <h3>Search Results:</h3>
                        {
                            this.state.people.map(function(p, index) {
                                return (
                                    <Link to={"/person/" + p.id} className="nav-link-item" key={index}>
                                        <div className="personQuickInfoDisplay">
                                            <p>First Name: {p.firstname}</p>
                                            <p>Last Name: {p.lastname}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
