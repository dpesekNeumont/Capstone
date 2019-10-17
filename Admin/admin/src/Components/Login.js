import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    handleClick = () => {
        if (this.state.username === 'test' && this.state.username === 'test') {
            localStorage.setItem('loggedIn', 'true')
            this.props.reRender()
        }
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