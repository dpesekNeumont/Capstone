import React, { Component } from 'react'

import GetData from './ApiControllers/GetData'
import UpdateData from './ApiControllers/UpdateData'

export default class Board extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             appointments: []
        }
    }
    
    render() {
        return (
            <div className='container'>
                The Board
                <p>Make the left 25% of the screen is where the appointments go, and the rest of the screen is auto-filled by the amount of rooms the clinic has</p>
            </div>
        )
    }
}
