import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <div className='container Align-Center'>
                <div>
                    <h3>Login</h3>
                </div>
                <div>
                    <input type='text' placeholder='username' />
                </div>
                <div>
                    <input type='password' placeholder='password' />
                </div>
                <div>
                    <input type='submit' value='Submit' />
                </div>
            </div>
        )
    }
}
