import React, { Component } from 'react';
import './index.css';
import Game from './game';
import Data from './data';
import { PageContext } from '../../../contexts';
import ScoreBoard from './scoreboard';
import StatsModal from './stats';
import Leaderboard from './leaderboard';
import Settings from './settings';

class GamePortal extends Component {
    render() {
        return (
            <div className='wrapper'>
                <div className="GamePortalContainer">
                    <div className='stats'>
                        <div className='game-score'>
                            <PageContext.Consumer>
                                {
                                    state => <ScoreBoard {...state} />
                                }
                            </PageContext.Consumer>
                        </div>
                        <div className='live-data'>
                            <PageContext.Consumer>
                                {
                                    state => <Data {...state} />
                                }
                            </PageContext.Consumer>
                        </div>
                    </div>
                    <div className='live-portal'>
                        <PageContext.Consumer>
                            {
                                state => <Game {...state} />
                            }
                        </PageContext.Consumer>
                    </div>
                </div>
                {this.props.showStatsView === true ? (
                    <div className='stats-modal'>
                        <PageContext.Consumer>
                            {
                                state => <StatsModal {...state} />
                            }
                        </PageContext.Consumer>
                    </div>
                ) : null}
                {this.props.showLeaderBoardView === true ? (
                    <div className='stats-modal'>
                        <Leaderboard />
                    </div>
                ) : null}
                {this.props.showSettingsView === true ? (
                    <div className='stats-modal'>
                        <PageContext.Consumer>
                            {
                                state => <Settings {...state} />
                            }
                        </PageContext.Consumer>
                    </div>
                ) : null}
            </div>
           
        );
    }
}

export default GamePortal;
