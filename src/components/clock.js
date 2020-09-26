import React, { Component } from 'react'
import {green} from "@material-ui/core/colors";

//inspired by https://medium.com/better-programming/building-a-simple-countdown-timer-with-react-4ca32763dda7
export default class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seconds: 0
        };
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
                this.setState({seconds: this.state.seconds + 1})

        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        return (
                     <p style={{display: 'flex', justifyContent: 'center'}} color={green}>Online seit {this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds} Sekunden</p>

        )
    }
}