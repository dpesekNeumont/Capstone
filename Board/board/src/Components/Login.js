import React, { Component } from 'react'

import GetData from './ApiControllers/GetData'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            people: []
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/staff')
            .then(response => response.json())
            .then(data => this.setState({ people: data }))
    }

    reloadAppts = () => {

    }

    render() {
        return (
            <div className='container'>
            <h3>Login</h3>
            <h4>{this.state.loggedInMessage}</h4>
            <div className='horizontal'>
                <p className='input-fields'>Username:   <input type='text' onChange={({ target: { value: username } }) => this.setState({ username })} value={this.state.username} /></p>
            </div>
            <div className='horizontal'>
                <p className='input-fields'>Password:  <input type='password' onChange={({ target: { value: password } }) => this.setState({ password })} value={this.state.password} /></p>
            </div>

            <div className='login-buttons'>
                <input type='submit' value='Cancel' onClick={this.cancelClicked} />
                <input type='submit' value='Login' onClick={this.loginClicked} />
            </div>
        </div>
        )
    }
}
