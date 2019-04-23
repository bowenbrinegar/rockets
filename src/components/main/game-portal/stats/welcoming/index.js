import React, { Component } from 'react';
import './index.css';

class Welcoming extends Component {
    render() {
        return (
            <div className="WelcomingContainerStats">
                <div className='wrapper'>
                    <h1>Welcome to Stats</h1>
                    <h3>Select a graph to continue your journey through outspace!</h3>
                </div>
            </div>
        );
    }
}

export default Welcoming;
