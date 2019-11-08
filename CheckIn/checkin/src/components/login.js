//send either patient or staff along to do check which one we are logging in as
import React, { Component } from 'react'

import AuthenticateUser from './ApiControllers/AuthenticateLogin'

export default class login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            people: [],
            person: {},
            username: '',
            password: '',
            loggedInMessage: '',
            option: ''
        }
    }

    componentDidMount = () => {
        let type = this.props.match.params.option
        this.setState({option: type})
        if (type === 'staff') {
            fetch('http://localhost:8080/staff')
                .then(response => response.json())
                .then(data => this.setState({ people: data }))
        } else if (type === 'patient') {
            fetch('http://localhost:8080/getAllPatients')
                .then(response => response.json())
                .then(data => this.setState({ people: data }))
        }
    }

    cancelClicked = () => {
        this.props.history.push('/CheckIn')
    }

    loginClicked = () => {
        let authString = ''
        if (this.state.option === 'staff') {
            authString = 'http://localhost:8080/users'
        } else if (this.state.option === 'patient') {
            authString = 'http://localhost:8080/auth'
        }
        AuthenticateUser(authString, this.state.username, this.state.password)
        .then(response => {
            if(response.status === 200){
                localStorage.setItem('loggedIn', 'true')
                this.setState({loggedInMessage: ''})
                if (this.state.option === 'staff')
                this.props.history.push('/CheckIn/Staff')
                else if (this.state.option === 'patient') {
                    this.props.history.push('/CheckIn/Confirmation/' + this.state.person.id)
                }
            }
            else {
                localStorage.removeItem('loggedIn')
                this.setState({loggedInMessage: 'Invalid cridentials, please try again'})
            }
        }).catch();
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
