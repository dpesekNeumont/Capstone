import React, { Component } from 'react'

export default class PersonDetails extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            person: {
                'firstName': '',
                'lastName': ''
            },
             url: 'http://localhost:8080/person/'
        }
    }
    
    componentDidMount() {
        fetch(this.state.url + this.props.match.params.personId, {
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

    }

    handleDelete = () => {

    }


    render() {
        return (
            <div className='container'>
                <div className='personDetailsDisplay'>
                    <span>
                        <p>First Name: </p>
                        <input type='text' value={this.state.person.firstName} onChange={({target: {value: firstname }})=> this.setState({firstname})} />
                    </span>
                    <span>
                        <p>Last Name: </p>
                        <input type='text' value={this.state.person.lastName} onChange={({target: {value: lastname }})=> this.setState({lastname})} />
                    </span>
                </div>
                <input type='submit' value='submit changes' onClick={this.handleSubmit} />
                <br/>
                <input type='button' value='Delete' onClick={this.handleDelete} />
            </div>
        )
    }
}