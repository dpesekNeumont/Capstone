import React, { Component } from 'react'

export default class FinalConfirmation extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount = () => {
        this.id = setTimeout(() => this.props.history.push('/CheckIn'), 5000)
    }

    render() {
        return (
            <div className='container'>
                <h3>You Are All Checked In, Please Wait For Your Name to be Called</h3>
            </div>
        )
    }
}
