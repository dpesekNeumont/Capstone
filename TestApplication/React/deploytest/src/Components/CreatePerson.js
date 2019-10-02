import React, { Component } from 'react'
import personHelper from '../APIControllers/CreatePersonController'

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
        personHelper(this.state.searchString, [this.state.firstname, this.state.lastname])
       .then(response => response.json())
       .then(data => this.setState({people: data}, () => {console.log(data)}))
   }
    
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h3>Create A Person</h3>
                    <p>First Name:</p>
                    <input type="text" className="form-control" onChange={({target: {value: firstname }})=> this.setState({firstname})} value={this.state.firstname.value}/>
                    <p>Last Name:</p>
                    <input type="text" className="form-control" onChange={({target: {value: lastname }})=> this.setState({lastname})} value={this.state.lastname.value}/>
                    <br/>
                    <input type="submit" onClick={this.handleClick}/>
                </div>
            </React.Fragment>
        )
    }
}
