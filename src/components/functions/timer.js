import React, { Component } from 'react'

//inspired by https://medium.com/better-programming/building-a-simple-countdown-timer-with-react-4ca32763dda7
export default class Timer extends Component {
    constructor(props) {
        super(props);


    this.state = {
        seconds: undefined
    };
    }

    componentDidMount() {
        this.setState({seconds: (this.props.time*1).toFixed(0)})
        this.myInterval = setInterval(() => {
            console.log('time: '+ this.state.seconds)
            if (this.state.seconds > 0) {
                this.setState({seconds: this.state.seconds - 1})
            }
            if (this.state.seconds === 0) {

                    clearInterval(this.myInterval)
                }

        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        return (
            <div>
                { this.state.seconds === 0
                    ? <p>Die Maschine steht bereit</p>
                    : <p>Verfügbar in {this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds} Sekunden</p>
                }
            </div>
        )
    }
}