import React, { Component } from 'react'

import personUpdater from '../APIControllers/UpdatePersonController'
import personDeleter from '../APIControllers/DeletePersonController'

export default class PersonDetails extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            person: {
                'id': 0,
                'firstName': '',
                'lastName': ''
            },
            firstName: '',
            lastName: '',
             url: 'http://localhost:8080/person'
        }
    }
    
    componentDidMount() {
        fetch(this.state.url + '/' + this.props.match.params.personId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrer: 'no-referrer'
        })
        .then(response => {return response.text()})
        .then(data => this.setState({person: JSON.parse(data)}))
    }

    handleSubmit = () => {
        let guy = {
            "id": this.state.person.id,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName
        }
        personUpdater(this.state.url, guy)
    }

    handleDelete = () => {
        personDeleter(this.state.url, this.state.person.id)
    }


    render() {
        return (
            <div className='container'>
                <div className='personDetailsDisplay'>
                    <span>
                        <p>First Name: </p>
                        <input type='text' placeholder={this.state.person.firstName} onChange={({target: {value: firstName }})=> this.setState({firstName})} value={this.state.firstName.value}/>
                    </span>
                    <span>
                        <p>Last Name: </p>
                        <input type='text' placeholder={this.state.person.lastName} onChange={({target: {value: lastName }})=> this.setState({lastName})} value={this.state.lastName.value}/>
                    </span>
                </div>
                <input type='submit' value='submit changes' onClick={this.handleSubmit} />
                <br/>
                <input type='button' value='Delete' onClick={this.handleDelete} />
            </div>
        )
    }
}