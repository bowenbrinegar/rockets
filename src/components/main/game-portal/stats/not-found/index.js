import React, { Component } from 'react';
import './index.css';

class NotFound extends Component {
    render() {
        return (
            <div className="WelcomingContainerStats">
                <div className='wrapper'>
                    <h1>Oops!</h1>
                    <h3>These are not the charts that you are looking for...</h3>
                </div>
            </div>
        );
    }
}

export default NotFound;
