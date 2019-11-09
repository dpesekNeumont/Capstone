import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import AuthLogin from './ApiControllers/AuthenticateLogin'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            loggedInMessage: '',
            people: []
        }
    }

    componentDidMount = () => {
        console.log('component Did mount: Login')
    }

    componentWillMount = () => {
        console.log('Component will mound: login')
    }

    onLoginClicked = () => {
        AuthLogin('http://localhost:8080/users', this.state.username, this.state.password)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('loggedIn', 'true')
                    this.props.reRender()
                }
                else {
                    localStorage.removeItem('loggedIn')
                    this.setState({ loggedInMessage: 'Invalid cridentials, please try again' })
                }
            }).catch();
    }

    render() {
        if (localStorage.getItem('loggedIn') === 'true') {
            return (
                <Redirect to="/Board/Display" />
            )
        } else {
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
                        <input type='submit' value='Login' onClick={this.onLoginClicked} />
                    </div>
                </div>
            )
        }
    }
}
