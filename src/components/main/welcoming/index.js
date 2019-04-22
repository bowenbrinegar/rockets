import React, { Component } from 'react';
import './index.css';

class Welcoming extends Component {
    render() {
        return (
            <div className="WelcomingContainer">
                <div>
                    <h1>Welcome to Rockets</h1>
                    <h3>--<br/>/------\<br/>\------/<br/>--<br/></h3>
                    <h3>;(________________);</h3>
                    <h3>/\<br/>| |<br/>| |<br/>//|\\<br/>""</h3>
                    <h3>Press enter to enter</h3>
                    <button onClick={this.props.onClick}>Enter</button>
                </div>
            </div>
        );
    }
}

export default Welcoming;
