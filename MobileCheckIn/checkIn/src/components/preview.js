import React, { Component } from 'react'
import { View, Text, Button, AsyncStorage } from 'react-native'
import { DateTime } from 'luxon'

import GetData from './apiControllers/Getdata'
import UpdateData from './apiControllers/UpdateData'

export default class preview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            apiIP: '192.168.137.1',
            appointments: [],
            messages: {
                noAppt: ''
            },
            record: 0
        }
    }

    componentDidMount = async () => {
        if (await AsyncStorage.getItem('loggedIn') === 'true') {
            if (this.props.navigation.getParam('id') === undefined) {
                this.props.navigation.navigate('CheckIn')
            } else {
                GetData(`http://${this.state.apiIP}:8080/appointment/patient`, this.props.navigation.getParam('id'))
                    .then(response => this.compareTime(response))
            }
        } else {
            this.props.navigation.navigate('Home')
        }
    }

    compareTime = (appts) => {
        let d = new Date()
        let current = DateTime.fromMillis(d.getTime())
        appts = appts.filter((a) => {
            let guy = DateTime.fromMillis(a.date)
            return (current.month === guy.month && current.day === guy.day && current.year === guy.year && !(a.checkedIn))
        })
        if (appts.length > 0) {
            this.setState({ appointments: appts })
        } else {
            this.setState({ messages: { noAppt: 'There are no appointments scheduled for today' } })
        }
    }

    acknowledgedThing(index) {
        let appt = this.state.appointments[index]
        appt.needsWorkPriorToAppt = !appt.needsWorkPriorToAppt
        UpdateData(`http://${this.state.apiIP}:8080/appointment`, appt)
            .then(response => {
                if (response.status === 200) {
                    this.props.navigation.navigate('Home')
                } else {
                    this.props.navigation.navigate('Error')
                }
            })
        this.props.navigation.navigate('Home')
    }

    checkInConfirmed(index) {
        let appt = this.state.appointments[index]
        appt.checkedIn = !appt.checkedIn
        UpdateData(`http://${this.state.apiIP}:8080/appointment`, appt)
            .then(response => {
                if (response.status === 200) {
                    this.props.navigation.navigate('Confirmation')
                } else {
                    this.props.navigation.navigate('Error')
                }
            })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
                <View style={{ flex: 0.1, alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 18 }}>Check-In</Text>
                </View>
                <View style={{ flex: 0.1, alignItems: 'center' }}>
                    <Text>{this.state.messages.noAppt}</Text>
                    <Button
                        title='Home'
                        onPress={() => navigate('Home')}
                    />
                </View>
                <View style={{ flex: 0.1 }}>
                    {
                        this.state.appointments.map((p, index) => {
                            let base = <View key={index}>
                                <Text style={{ fontSize: 20, textAlign: 'center', padding: 5 }}>Date: {DateTime.fromMillis(p.date).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</Text>
                                <Text style={{ fontSize: 20, textAlign: 'center', padding: 5 }}>Doctor's Name: {p.doctor.firstName} {p.doctor.lastName}</Text>
                                <Text style={{ fontSize: 20, textAlign: 'center', padding: 5 }}>Patient's Name: {p.patient.firstName} {p.patient.lastName}</Text>
                                <Text style={{ fontSize: 20, textAlign: 'center', padding: 5 }}>Needs Work Prior To Appointment: {`${p.needsWorkPriorToAppt}`}</Text>
                            </View>
                            if (p.needsWorkPriorToAppt === false) {
                                return (
                                    <View key={index + 10}>
                                        {base}
                                        <Button
                                            title='Confirm'
                                            onPress={() => this.checkInConfirmed(index)}
                                        />
                                    </View>
                                )
                            } else {
                                return (
                                    <View key={index + 10}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, textAlign: 'center' }}>You Must See Either the Pharmacy or Get Labs Done Prior to Your Appointment</Text>
                                        {base}
                                        <Button
                                            title='Acknowledge'
                                            onPress={() => this.acknowledgedThing(index)}
                                        />
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            </View>
        )
    }
}
