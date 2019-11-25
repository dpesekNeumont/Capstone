import React, { Component } from 'react'
import {View, Text, AsyncStorage} from 'react-native'

export default class confirmation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    componentDidMount = async () => {
        if (await AsyncStorage.getItem('loggedIn') === 'true') {
        this.id = setTimeout(() => {this.props.navigation.navigate('Home'), AsyncStorage.setItem('loggedIn', 'false')}, 5000)
        } else {
            this.props.navigation.navigate('Home')
        }
    }
    
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', padding: 10}}>
                <Text style={{fontSize: 20}}>You Are Checked-In Please Wait For Your Name to Be Called</Text>
            </View>
        )
    }
}
