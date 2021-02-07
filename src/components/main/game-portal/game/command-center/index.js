import React, { Component } from 'react';
import './index.css';

class CommandCenter extends Component {
    render() {
        return (
            <div className="CommandCenter">
                { !this.props.newGameClick ? (
                    <div className='command-pod pause-play'>
                        <button onClick={this.props.startGame}>New Game</button>
                        <button onClick={this.props.pause}>Pause / Play</button>
                    </div>
                ) : (
                    <div className='command-pod pause-play'>
                        <button>New Game</button>
                        <button onClick={this.props.pause}>Pause / Play</button>
                    </div>
                )}
                <div className='command-pod controls'>
                    <button onClick={this.props.partyMode}>Party Mode</button>
                    {/* <button onClick={this.props.showStats}>Stats</button> */}
                    {/* <button onClick={this.props.showLeaderboard}>Leaderboard</button> */}
                    {/* <button onClick={this.props.showSettings}>Settings</button> */}
                </div>
            </div>
        );
    }
}

export default CommandCenter;
