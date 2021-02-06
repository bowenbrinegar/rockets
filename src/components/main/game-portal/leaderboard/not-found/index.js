import React, { Component } from 'react';
import './index.css';

class NotFound extends Component {
    render() {
        return (
            <div className="LeaderboardContainer">
                <div className='wrapper'>
                    <h1>Oops!</h1>
                    <h3>Leaderboard Not Found</h3>
                </div>
            </div>
        );
    }
}

export default NotFound;
