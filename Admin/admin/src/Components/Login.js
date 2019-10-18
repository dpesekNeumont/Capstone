import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import AuthenticateUser from './ApiControllers/AuthenticateLogin'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            authUrl: 'http://localhost:8080/users',
            loggedInMessage: ''
        }
    }

    handleClick = () => {
        AuthenticateUser(this.state.authUrl, this.state.username, this.state.password)
        .then(response => {
            console.log(response.status)
            if(response.status === 200){
                localStorage.setItem('loggedIn', 'true')
                this.setState({loggedInMessage: ''})
                this.props.reRender()
            }
            else {
                
                localStorage.removeItem('loggedIn')
                this.setState({loggedInMessage: 'Invalid cridentials, please try again'})
            }
        }).catch();
    }

    render() {
        if (localStorage.getItem('loggedIn') === "true") {
            return <Redirect to="/Action"/>
         }
        return (
            <div className='container Align-Center'>
                <div>
                    <h3>Login</h3>
                    <h4>{this.state.loggedInMessage}</h4>
                </div>
                <div>
                    <input title='username' type='text' placeholder='username' onChange={({target: {value: username }})=> this.setState({username})} value={this.state.username.value}/>
                </div>
                <div>
                    <input title='password' type='password' placeholder='password' onChange={({target: {value: password }})=> this.setState({password})} value={this.state.password.value}/>
                </div>
                <div>
                    <input type='submit' value='Submit' onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
}