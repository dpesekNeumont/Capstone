import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {DateTime} from 'luxon'

import GetData from './ApiControllers/GetData'
import UpdateData from './ApiControllers/UpdateData'

export default class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: {
                noAppts: ''
            },
            appointments: []
        }
    }

    componentDidMount = () => {
        this.reloadAppts()
    }

    reloadAppts = () => {
        let d = new Date()
        let current = DateTime.fromMillis(d.getTime())
        let appts = this.state.appointments.filter((a) => {
            let guy = DateTime.fromMillis(a.date)
            return (current.month === guy.month && current.day === guy.day && current.year === guy.year && a.checkedIn)
        })
        if (appts.length > 0) {
            this.setState({appointments: appts})
        } else  {
            this.setState({messages: {noAppts: 'THERE ARE NO APPOINTMENTS TO SHOW'}})
        }
    }

    render() {
        if (localStorage.getItem('loggedIn') !== 'true') {
            return (
                <Redirect to='/Board/Login' />
            )
        }
        return (
            <div className='container'>
                The Board
                <p>Make the left 25% of the screen is where the appointments go, and the rest of the screen is auto-filled by the amount of rooms the clinic has</p>
            </div>
        )
    }
}
