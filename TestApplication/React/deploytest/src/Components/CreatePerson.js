import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class createperson extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            firstname: '',
            lastname: '',
            createString: 'http://localhost:8080/deployTest/person'
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
                    <h3>Create A Person</h3>
                    <p>First Name:</p>
                    <input type="text"/>
                    <p>Last Name:</p>
                    <input type="text" />
                    <br/>
                    <input type="submit" />
                </div>
            </React.Fragment>
        )
    }
}
