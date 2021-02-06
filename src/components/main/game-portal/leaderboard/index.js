import React, { Component } from 'react';
import './index.css';
import { FlightBox } from '../../../../utils/flight-box';

import NotFound from './not-found'


class StatsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            leaderboard: []
        }

        this.renderLeaderboard = this.renderLeaderboard.bind(this);
    }

    renderLeaderboard() {
        const htmlArr = [];
        const data = this.state.data

        let i;
        for (i = 0; i < 10; i++) {
            const html = (
                <div className='leader-pod'>
                    <h3>{data[i].username} ---------------------------------------- {data[i].score}</h3>
                </div>
            );

            htmlArr.push(html);
        }

        this.setState({
            leaderboard: [...this.state.leaderboard, ...htmlArr]
        });
    }

    componentDidMount() {
        FlightBox.getFlightRecords().then(payload => {
            payload = JSON.parse(payload);
            
            const data = payload.sort((a, b) => {
                return b.score - a.score
            });

            this.setState({
                data: data
            }, this.renderLeaderboard)
        })
    }

    render() {
        return (
            <div className='leaderboard-wrapper'>
                <div className="LeaderboardModalContainer">
                    {this.state.leaderboard !== [] ? (
                        <div className='wrapper'>
                            {this.state.leaderboard}
                        </div>
                    ) : (
                        <NotFound />
                    )}
                </div>
            </div>
        );
    }
}

export default StatsModal;
