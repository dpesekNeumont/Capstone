import React, { Component } from 'react'
import {View, Text} from 'react-native'

export default class confirmation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    componentDidMount = () => {
        this.id = setTimeout(() => this.props.navigation.navigate('Home'), 5000)
    }
    
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', padding: 10}}>
                <Text style={{fontSize: 20}}>You Are Checked-In Please Wait For Your Name to Be Called</Text>
            </View>
        )
    }
}
