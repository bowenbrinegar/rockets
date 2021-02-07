import React, { Component } from 'react';
import './index.css';
import Game from './game';
import Data from './data';
import { PageContext } from '../../../contexts';
import ScoreBoard from './scoreboard';
// import Leaderboard from './leaderboard';
// import Settings from './settings';


class GamePortal extends Component {
    state = {
        tooSmall: false
    }

    interval = setInterval(() => {}, 2000);

    checkViewport = () => {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

        if (vw < 800) {
            this.setState({ tooSmall: true })
        } else {
            this.setState({ tooSmall: false })
        }
        
    }

    componentDidMount() {
        window.addEventListener('resize', this.checkViewport, false)
        this.checkViewport()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkViewport, false)
    }


    render() {
        const { tooSmall } = this.state;
		const { showStatsView, showLeaderBoardView, showSettingsView } = this.props;
        return (
            <div className='wrapper'>
                {tooSmall ? (
                    <div className="desktop-warning-container">
                        <div>
                            <h1>Oops!</h1>
                            <h1>Game built for Desktop</h1>
                            <h3>--<br/>/------\<br/>\------/<br/>--<br/></h3>
                            <h3>;(________________);</h3>
                            <h3>{'/\\'}<br/>| |<br/>| |<br/>{'//|\\\\'}<br/>""</h3>
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
            </div>
           
        );
    }
}

export default GamePortal;
