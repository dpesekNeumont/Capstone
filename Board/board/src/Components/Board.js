import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Dragula from 'react-dragula'
import { DateTime } from 'luxon'

import GetData from './ApiControllers/GetData'
// import UpdateData from './ApiControllers/UpdateData'
// import AppointmentView from './AppointmentView'

export default class Board extends Component {

    dragger = Dragula({
        accepts: function (el, target, source, sibling) {
            return target.id.includes('Room')
        }
    }).on('drag', (el, source) => {
        
    }).on('drop', (el, source, target, sibling) => {
        
    });

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
        this.interval = setInterval(this.resetList, 120000)
        this.resetList()
    }

    makeRooms = (clinic) => {
        let rooms = [];
        for (let i = 0; i < clinic.numOfRooms; i++) {
            rooms.push(
                <div key={i} id={`Room${i}`} className='roomView ready' ref={this.dragulaDecorator}>
                    <h4>Room #{i + 1}</h4>
                </div>)
        }
        this.setState({ rooms })
    }

    resetList = () => {
        GetData('http://localhost:8080/appointment', 'today')
            .then(response => this.reloadAppts(response))
    }

    reloadAppts = (appts) => {
        let d = new Date()
        let current = DateTime.fromMillis(d.getTime())
        appts = appts.filter((a) => {
            let guy = DateTime.fromMillis(a.date)
            return (current.month === guy.month && current.day === guy.day && current.year === guy.year && a.checkedIn)
        })
        if (appts.length > 0) {
            this.setState({ appointments: appts })
        } else {
            this.setState({ appointments: appts })
            this.setState({ messages: { noAppts: 'THERE ARE NO APPOINTMENTS TO SHOW' } })
        }
    }

    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            // ReactDOM.findDOMNode(this).parentNode.dragger.containers.push(componentBackingInstance);
            this.dragger.containers.push(componentBackingInstance);
        }
    };

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
                        <div>
                            <h3 className='board-header'>Checked-In Appointments</h3>
                            <h3>{this.state.messages.noAppts}</h3>
                            <div ref={this.dragulaDecorator} id='apptHolder'>
                                {
                                    this.state.appointments.map((a, index) => {
                                        let thing = <div className='appointmentPreview' key={index} id={`Appt${index}`}>
                                            <p>{a.patient.lastName.substring(0, 2)}, {a.patient.firstName.substring(0, 2)}</p>
                                            <p>Doctor: {a.doctor.firstName} {a.doctor.lastName}</p>
                                            <p>{DateTime.fromMillis(a.date).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                        return thing
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='split right'>
                    <div className='centered'>
                        <h3 className='board-header'>All Rooms for Family Clinic</h3>
                        <div className='room-holder' id='roomHolder'>
                            {this.state.rooms}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
