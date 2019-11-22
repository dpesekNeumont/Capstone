import React, { Component } from 'react'
import {View, Text} from 'react-native'
import * as Font from 'expo-font';

export default class error extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <View>
                <Text>There was an Error, Please Try Again</Text>
            </View>
        )
    }
}
