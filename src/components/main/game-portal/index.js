import React, { Component } from 'react';
import './index.css';
import Game from './game';
import Data from './data';
import { PageContext } from '../../../contexts';
import ScoreBoard from './scoreboard';
import Leaderboard from './leaderboard';
import Settings from './settings';


class GamePortal extends Component {
    render() {
		const { showStatsView, showLeaderBoardView, showSettingsView } = this.props;
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
                {showStatsView || showLeaderBoardView  || showSettingsView   ? (
                    <div className='stats-modal'>
						<div className='StatsModalContainer'>
							<div>
								<h1>Oops!</h1>
								<h3>These are not the charts that you are looking for...</h3>
							</div>
						</div>
                    </div>
                ) : null}
            </div>
           
        );
    }
}

export default GamePortal;
