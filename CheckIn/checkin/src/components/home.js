import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    patientLoginClicked = () => {
        this.props.history.push('/CheckIn/Login/patient');
    }

    staffLoginClicked = () => {
    }

    render() {
        return (
            <div className='container'>
                <ul>
                    <li>
                        <Link to={'/CheckIn/Login/patient'} >Patient Login</Link>
                    </li>
                    <li>
                        <Link to={'/CheckIn/Login/staff'} >Staff Login</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
