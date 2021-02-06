import React, { Component } from 'react';
import Welcoming from './welcoming';
import GamePortal from './game-portal';
import './index.css';

class Main extends Component {
    render() {
        return (
            <div className="Main" ref={this.props.mainRef}>
                {
                    this.props.openPortal ? <GamePortal {...this.props} /> : <Welcoming {...this.props} />
                }
            </div>
        );
    }
}

export default Main;
