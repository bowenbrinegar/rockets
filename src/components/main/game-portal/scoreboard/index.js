import React, { Component } from 'react';
import './index.css';

class ScoreBoard extends Component {
    render() {
        return (
            <div className="ScoreContainer">
                <div className='stat'>
                    <h1>Score:</h1>
                    <h1>{this.props.score}</h1>
                </div>
                <div className='stat'>
                    <h1>Lives:</h1>
                    <h1>{this.props.lives}</h1>
                </div>
                <div className='stat'>
                    <h1>Time:</h1>
                    <h1>{this.props.time}</h1>
                </div>
            </div>
        );
    }
}

export default ScoreBoard;
