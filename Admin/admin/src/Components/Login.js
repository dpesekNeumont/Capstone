import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import AuthenticateUser from './ApiControllers/AuthenticateLogin'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            authUrl: ''
        }
    }

    handleClick = () => {
        AuthenticateUser(this.state.authUrl, this.state.username, this.state.password)
        .then(response => {
            if(response.status === 200){
                localStorage.setItem('loggedIn', 'true')
                this.props.reRender()
            }
        }).catch();
    }

    render() {
        if (localStorage.getItem('loggedIn') === "true") {
            return <Redirect to="/"/>
         }
        return (
            <div className='container Align-Center'>
                <div>
                    <h3>Login</h3>
                </div>
                <div>
                    <input type='text' placeholder='username' onChange={({target: {value: username }})=> this.setState({username})} value={this.state.username.value}/>
                </div>
                <div>
                    <input type='password' placeholder='password' onChange={({target: {value: password }})=> this.setState({password})} value={this.state.password.value}/>
                </div>
                <div>
                    <input type='submit' value='Submit' onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
}