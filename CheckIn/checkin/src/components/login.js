//send either patient or staff along to do check which one we are logging in as
import React, { Component } from 'react'

export default class login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             person: {}
        }
    }
    
    componentDidMount = () => {
        let type = this.props.match.params.option
        console.log(type)
        if (type === 'staff') {
            
        } else if (type === 'patient') {

        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
