import React, { Component } from 'react'
import { View, Text, Button, TextInput, AsyncStorage } from 'react-native'

import AuthenticateLogin from './apiControllers/AuthenticateLogin'

export default class login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            option: '',
            apiIP: '10.10.16.145',
            username: '',
            password: '',
            people: [],
            perosn: {},
            messages: {
                invalidLogin: ''
            }
        }
    }

    componentDidMount = async () => {
        fetch(`http://${this.state.apiIP}:8080/staff`)
            .then(response => response.json())
            .then(data => this.setState({ people: data }))
        if (await AsyncStorage.getItem('loggedIn') === 'true')
            AsyncStorage.setItem('loggedIn', 'false')
    }

    login = () => {
        AuthenticateLogin(`http://${this.state.apiIP}:8080/users`, this.state.username, this.state.password)
            .then(response => {
                if (response.status === 200) {
                    AsyncStorage.setItem('loggedIn', 'true')
                    this.props.navigation.navigate('CheckIn')
                } else {
                    this.setState({ messages: { invalidLogin: 'Invalid Cridentials, Please Try Again' } })
                }
            })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
                <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Login</Text>
                    <Text style={{ fontSize: 18 }}>{this.state.messages.invalidLogin}</Text>
                </View>
                <View style={{ flex: 0.1, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
                    <Text style={{ flex: 0.7 }}>Username</Text>
                    <TextInput
                        onChangeText={(username) => this.setState({ username })}
                        style={{
                            height: 30, width: 200,
                            borderColor: 'gray', backgroundColor: '#fff',
                            borderWidth: 1
                        }}
                    />
                </View>
                <View style={{ flex: 0.1, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
                    <Text style={{ flex: 0.7 }}>Password: </Text>
                    <TextInput
                        onChangeText={(password) => this.setState({ password })}
                        style={{
                            height: 30, width: 200,
                            borderColor: 'gray', backgroundColor: '#fff',
                            borderWidth: 1
                        }}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{ flex: 0.5, flexDirection: 'column' }}>
                    <Button
                        title='Login'
                        onPress={this.login}
                    />
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.state.results}</Text>
                </View>
            </View>
        )
    }
}
