import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Dragula from 'react-dragula'
import { DateTime } from 'luxon'

import GetData from './ApiControllers/GetData'
import UpdateData from './ApiControllers/UpdateData'
// import AppointmentView from './AppointmentView'

export default class Board extends Component {

    dragger = Dragula({
        accepts: function (el, target, source, sibling) {
            console.log(el.id, source.id)
            return target.id.includes('Room')
        }
    }).on('drag', (el, source) => {

    }).on('drop', (el, source, target, sibling) => {
        this.changeColorOnDrop(source.id)
        this.changeTargetColor(el.id)
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
        this.interval = setInterval(this.resetList, 1000000000)
        //set the interval to an absurd amount of time for presentation
        this.resetList()
    }
    
    changeTargetColor = (id) => {
        document.getElementById(id).style.backgroundColor = 'rgba(0,0,0,0)';
    }

    changeColorOnDrop = (id) => {
        document.getElementById(id).style.backgroundColor = "rgb(27, 73, 144)";
    }

    changeRoomColor = (event) => {
        console.log(document.getElementById(event.target.parentElement.id).style.backgroundColor)
        if (document.getElementById(event.target.parentElement.id).style.backgroundColor === 'rgb(27, 73, 144)') {
            document.getElementById(event.target.parentElement.id).style.backgroundColor = 'rgb(166, 191, 239)'
            document.getElementById(event.target.parentElement.id).style.color = 'black'
            document.getElementById(event.target.parentElement.id).children[1].style.color = 'black'
        } else if (document.getElementById(event.target.parentElement.id).style.backgroundColor === 'rgb(166, 191, 239)') {
            let thing = document.getElementById(event.target.parentElement.id).children[1].id.split('t')[1]
            UpdateData('http://localhost:8080/appointment', thing)
            document.getElementById(event.target.parentElement.id).style.color = 'white'
            document.getElementById(event.target.parentElement.id).children[1].remove()
            document.getElementById(event.target.parentElement.id).style.backgroundColor = 'rgb(36, 148, 36)'
        }
    }

    makeRooms = (clinic) => {
        let rooms = [];
        for (let i = 0; i < clinic.numOfRooms; i++) {
            rooms.push(
                <div key={i} id={`Room${i}`} className='roomView ready' ref={this.dragulaDecorator} onClick={this.changeRoomColor}>
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
            return (current.month === guy.month && current.day === guy.day && current.year === guy.year && a.checkedIn && (!a.finished))
        })
        this.setState({ appointments: appts })
        console.log(appts)
        if (appts.length === 0) {
            this.setState({ messages: { noAppts: 'THERE ARE NO APPOINTMENTS TO SHOW' } })
        } else {
            this.setState({ messages: {noAppts: ''}})
        }
    }

    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
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
                            <h2 className='board-header'>Checked-In Appointments</h2>
                            <h3>{this.state.messages.noAppts}</h3>
                            <div ref={this.dragulaDecorator} id='apptHolder'>
                                {
                                    this.state.appointments.map((a, index) => {
                                        let thing = <div className='appointmentPreview' key={index} id={`Appt${a.id}`}>
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
                        <h2 className='board-header'>All Rooms for Family Clinic</h2>
                        <div className='room-holder' id='roomHolder'>
                            {this.state.rooms}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
