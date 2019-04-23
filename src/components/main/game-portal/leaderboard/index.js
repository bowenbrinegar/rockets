import React, { Component } from 'react';
import './index.css';
import { FlightBox } from '../../../../utils/flight-box';

import NotFound from './not-found'


class StatsModal extends Component {

    render() {
        return (
            <div className='leaderboard-wrapper'>
                <div className="LeaderboardModalContainer">
                    <NotFound />
                </div>
            </div>
        );
    }
}

export default StatsModal;
