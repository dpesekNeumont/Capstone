import React, { Component } from 'react'
import { View, Text, Button, TextInput } from 'react-native'

export default class home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    staffLoginClicked = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Check-In</Text>
                <Button 
                title='Staff Login'
                onPress={this.staffLoginClicked}/>
            </View>
        )
    }
}