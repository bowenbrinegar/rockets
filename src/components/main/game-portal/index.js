import React, { Component } from 'react';
import './index.css';
import Game from './game'
import Data from './data'
import { PageContext } from '../../../contexts';
import ScoreBoard from './scoreboard';

class GamePortal extends Component {
    render() {
        return (
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
        );
    }
}

export default GamePortal;
