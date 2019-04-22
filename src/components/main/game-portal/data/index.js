import React, { Component } from 'react';
import './index.css';
import Gauge from './gauge';
import Scatter from './scatter';
import Line from './line';
import Projectile from './projectile';
import { PageContext } from '../../../../contexts';


class Data extends Component {
    render() {
        return (
            <div className="DataContainer">
                <div className='chart-container'>
                    <h4>Rockets Radar 3000</h4>
                    <div className='chart'>
                        <PageContext.Consumer>
                            {
                                state => <Projectile {...state} />
                            }
                        </PageContext.Consumer>
                    </div>
                </div>
                <div className='chart-container'>
                    <h4>Heatmap</h4>
                    <div className='chart'>
                        <PageContext.Consumer>
                            {
                                state => <Scatter {...state} />
                            }
                        </PageContext.Consumer>
                    </div>
                </div>
                <div className='chart-container'>
                    <h4>Speed / Time</h4>
                    <div className='chart'>
                        <PageContext.Consumer>
                            {
                                state => <Line {...state} />
                            }
                        </PageContext.Consumer>
                    </div>
                </div>
                <div className='chart-container'>
                    <h4>HyperBoost</h4>
                    <div className='chart'>
                        <PageContext.Consumer>
                            {
                                state => <Gauge {...state} />
                            }
                        </PageContext.Consumer>
                    </div>
                </div>                
            </div>
        );
    }
}

export default Data;
