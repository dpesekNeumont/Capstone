import React, { Component } from 'react'
import { View, Text, Button, TextInput, ScrollView, AsyncStorage } from 'react-native'


export default class checkIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ApiIp: '10.10.16.145',
            patients: [],
            filteredPatients: [],
            firstName: '',
            lastName: '',
            patient: {
                id: 0,
                firstName: '',
                lastName: '',
                primaryEmail: {
                    domain: '',
                    username: ''
                },
                primaryPhoneNumber: {
                    areaCode: '',
                    middleNums: '',
                    lastFour: ''
                }
            }
        }
    }

    componentDidMount = async() => {
        console.log('thingy')
        if (await AsyncStorage.getItem('loggedIn') === 'true') {
            console.log('thingy true')
            fetch(`http://${this.state.ApiIp}:8080/getAllPatients`)
            .then(response => response.json())
            .then(data => this.setState({patients: data}))
        } else {
            this.props.navigation.navigate('Home')
        }
    }

    searchPatient = () => {
        let matchedPatients = this.state.patients.filter((p) => {
            return (p.firstName === this.state.firstName && p.lastName === this.state.lastName)
        })
        this.setState({ filteredPatients: matchedPatients })
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
                <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Patient Search</Text>
                </View>
                <View style={{ flex: 0.1, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
                    <Text style={{ flex: 0.7 }}>First Name:</Text>
                    <TextInput
                        onChangeText={(firstName) => this.setState({ firstName })}
                        style={{
                            height: 30, width: 200,
                            borderColor: 'gray', backgroundColor: '#fff',
                            borderWidth: 1
                        }}
                    />
                </View>
                <View style={{ flex: 0.1, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
                    <Text style={{ flex: 0.7 }}>Last Name: </Text>
                    <TextInput
                        onChangeText={(lastName) => this.setState({ lastName })}
                        style={{
                            height: 30, width: 200,
                            borderColor: 'gray', backgroundColor: '#fff',
                            borderWidth: 1
                        }}
                    />
                </View>
                <View style={{ flex: 0.5, flexDirection: 'column' }}>
                    <Button
                        title='Search'
                        onPress={this.searchPatient}
                    />
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.state.results}</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {
                        this.state.filteredPatients.map((p, index) => {
                            return (
                                <View style={{flex: 1}} key={index}>
                                    <Text style={{padding: 5}}>First Name: {p.firstName}</Text>
                                    <Text style={{padding: 5}}>Last Name: {p.lastName}</Text>
                                    <Text style={{padding: 5}}>Phone Number: {p.primaryPhoneNumber.areaCode}-{p.primaryPhoneNumber.middleNums}-{p.primaryPhoneNumber.lastFour}</Text>
                                    <Text style={{padding: 5}}>Email: {p.primaryEmail.username}@{p.primaryEmail.domain}</Text>
                                    <Button 
                                        style={{padding: 5}}
                                        title='Pick'
                                        onPress={() => navigate('Preview', { 'id': p.id})}
                                    />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}
