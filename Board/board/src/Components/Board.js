import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import GetData from './ApiControllers/GetData'
// import UpdateData from './ApiControllers/UpdateData'
import AppointmentView from './AppointmentView'

export default class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: {
                noAppts: ''
            },
            appointments: [],
            rooms: []
        }
    }

    componentDidMount = () => {
        GetData('http://localhost:8080/clinics', 'family')
            .then(response => this.makeRooms(response))
    }



    makeRooms = (clinic) => {
        let rooms = [];
        for (let i = 0; i < clinic.numOfRooms; i++) {
            rooms.push(
                <div key={i} className='roomView ready'>
                    <h4>Room #{i + 1}</h4>
                </div>)
        }
        this.setState({ rooms })
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return (
                <Redirect to='/Board/Login' />
            )
        }
        return (
            <div className='container'>
                <div className='split left'>
                    <div className='centered'>
                        <AppointmentView />
                    </div>
                </div>
                <div className='split right'>
                    <div className='centered'>
                        <h3>All Rooms for Clinic</h3>
                        <div>
                            {this.state.rooms}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
