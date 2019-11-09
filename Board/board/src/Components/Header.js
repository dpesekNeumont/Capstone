import React, { Component } from 'react'
import Logo from '../logo.svg';

import AuthHeader from './AuthHeader'

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className='navbar navbar-dark bg-dark'>
                <div className="row">
                    <img src={Logo} className="App-logo" alt="logo" />
                        <AuthHeader reRender={this.props.reRender} />
                </div>
            </div>
        )
    }
}

