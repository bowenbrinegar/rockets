import React, { Component } from 'react';
import './index.css';
import { FlightBox } from '../../../../utils/flight-box';

import Welcoming from './welcoming';
import NotFound from './not-found'

import Scatter from './scatter';
import MultiScatter from './multi-scatter';
import VarMultiScatter from './var-multi-scatter';
import Line from './line';
import Radar from './radar';

class StatsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAllView: true,
            summaryReady: false,
            flightRecords: [],
            options: [],
            currentFlightData: null,
            selectedGraph: 'No Graph Selected',
            selectedData: null,
            graph: <Welcoming />,
            label: null,
            totalFlightData: [],
            funTimeData: [],
            scoreFlightData: [],
            timeFlightData: [],
            livesFlightData: [],
            positionHeatData: [],
            directionRadarData: [],
            speedLineData: []
        }

        this.turnOnAll = this.turnOnAll.bind(this);
        this.turnOnSelect = this.turnOnSelect.bind(this);
        this.populateOptions = this.populateOptions.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.selectGraph = this.selectGraph.bind(this);
        this.renderGraph = this.renderGraph.bind(this);
        this.calculateSummaryDashboard = this.calculateSummaryDashboard.bind(this);
        this.calculateFlightPath = this.calculateFlightPath.bind(this);

        this.selectGroup = React.createRef();
    }
    
    turnOnAll() {
        this.setState({
            isAllView: true
        });
    }

    turnOnSelect() {
        this.setState({
            isAllView: false
        });
    }

    populateOptions() {
        const options = this.state.flightRecords.map(record => {
            return <option value={record.id}>{record.id}</option>
        })

        this.setState({
            options
        })
    }

    fetchData(e) {
        const { value } = e.target;
        if (value !== "Please Select Flight") {
            FlightBox.fetchFlight(value).then(res => {
                this.setState({
                    currentFlightData: JSON.parse(res),
                    optionSelected: true
                }, this.calculateFlightPath)
            })
        } else {
            this.setState({
                optionSelected: false
            })
        }
    }

    calculateFlightPath() {
        this.setState({
            graph: null
        }, () => {
            const data = this.state.currentFlightData;
            let currTime = 0;
            let time = []
            let i;
            for (i = 0; i < 240; i++) {
                time.push(currTime);
                currTime += 250;
            }
            const calculations = [];
    
            calculations.push(this.calculateRocketsRadar(data, time));
            calculations.push(this.calculatePositionHeat(data.position));
            calculations.push(this.calculateDirectionRadar(data.position));
            calculations.push(this.calculateSpeedLine(data.speed));
    
            Promise.all(calculations).then(() => {
                this.selectGraph(this.state.selectedGraph);
            })
        })  
    }

    calculateSpeedLine(payload) {
        return new Promise(resolve => {
            const data = payload.map(point => {
                return {
                    x: point.time,
                    y: 60000 - point.speed
                }
            })

            const sorted = data.sort((a, b) => {
                return b.x - a.x;
            })
            console.log(sorted)
            this.setState({
                speedLineData: sorted
            }, () => {
                resolve()
            })
        })
    }

    calculateDirectionRadar(payload) {
        return new Promise(resolve => {
            let N = 0, NE = 0, E = 0, SE = 0, S = 0, SW = 0, W = 0, NW = 0;

            let prevX = null;
            let prevY = null;

            const distribute = (value) => {
                if (value === 180) {
                    E += 1;
                } else if (value < 180 && value > 90) {
                    NE += 1;
                } else if (value === 90) {
                    N += 1;
                } else if (value < 90 && value > 0) {
                    NW += 1;
                } else if (value === 0) {
                    W += 1;
                } else if (value < 0 && value > -90) {
                    SW += 1;
                } else if (value === -90) {
                    S += 1;
                } else {
                    SE += 1;
                }
            }

            payload.forEach(point => {
                if (prevX !== null && prevY !== null) {
                    const rad = Math.atan2(prevX - point.x_pos, prevY - point.y_pos);
                    const degree = rad * (180 / Math.PI);
                    distribute(degree);
                }
                prevX = point.x_pos;
                prevY = point.y_pos;
            })

            this.setState({
                directionRadarData: [N, NE, E, SE, S, SW, W, NW]
            }, () => {
                resolve()
            })
        })
    }

    calculatePositionHeat(payload) {
        return new Promise((resolve) => {
            const data = payload.map(item => {
                return {
                    x: item.x_pos,
                    y: item.y_pos
                }
            })
    
            this.setState({
                positionHeatData: data
            }, () => {
                resolve()
            })
        })
    }

    calculateRocketsRadar(payload, timeConstant) {
        return new Promise((resolve) => {

            const data = {
                first: payload['position'],
                second: payload['asteriod_bundles'],
                third: payload['hoop_bundles'],
                time: timeConstant
            }

            this.setState({
                rocketsRadarData: data
            }, () => {
                resolve();
            })
        })
    }

    selectGraph(graphName) {
        this.setState({
            selectedGraph: graphName,
            graph: null
        }, () => {
            if (graphName === 'score-flight') {
                this.setState({
                    label: 'Score',
                    selectedData: this.state.scoreFlightData
                }, this.renderGraph)
            } else if (graphName === 'time-flight') {
                this.setState({
                    label: 'Time',
                    selectedData: this.state.timeFlightData
                }, this.renderGraph)
            } else if (graphName === 'lives-flight') {
                this.setState({
                    label: 'Life',
                    selectedData: this.state.livesFlightData
                }, this.renderGraph)
            } else if (graphName === 'total-flight') {
                this.setState({
                    selectedData: this.state.totalFlightData
                }, this.renderGraph)
            } else if (graphName === 'rockets-radar') {
                this.setState({
                    selectedData: this.state.rocketsRadarData
                }, this.renderGraph)
            } else if (graphName === 'positon-heatmap') {
                this.setState({
                    label: 'Position',
                    selectedData: this.state.positionHeatData
                }, this.renderGraph)
            } else if (graphName === 'fun-time') {
                this.setState({
                    label: 'Fun',
                    selectedData: this.state.funTimeData
                }, this.renderGraph)
            } else if (graphName === 'direction-radar') {
                this.setState({
                    label: 'Direction Count',
                    selectedData: this.state.directionRadarData
                }, this.renderGraph)
            } else if (graphName === 'speed-time') {
                this.setState({
                    label: 'Speed',
                    selectedData: this.state.speedLineData
                }, this.renderGraph)
            } else {
                this.renderGraph()
            }
        });
    }

    renderGraph() {
        const curr = this.state.selectedGraph
        if (curr === 'score-flight' || curr === 'time-flight' || curr === 'lives-flight' || curr === 'positon-heatmap') {
            this.setState({
                graph: <Scatter data={this.state.selectedData} label={this.state.label}/>
            })
        } else if (curr === 'total-flight') {
            this.setState({
                graph: <MultiScatter data={this.state.selectedData} label1='Score' label2='Time' label3='Life'/>
            })
        } else if (curr === 'rockets-radar') {
            this.setState({
                graph: <VarMultiScatter data={this.state.selectedData} label1='Rocket' label2='Asteriod' label3='Hoop'/>
            })
        } else if (curr === 'fun-time' || curr === 'speed-time') {
            this.setState({
                graph: <Line data={this.state.selectedData} label={this.state.label}/>
            })
        } else if (curr === 'direction-radar') {
            this.setState({
                graph: <Radar data={this.state.selectedData} label={this.state.label}/>
            })
        } else {
            this.setState({
                graph: <NotFound />
            })
        }
        
    }
    
    calculateSummaryDashboard() {
        let fun = [];
        let i;
        for (i = 0; i < 250; i++) {
            fun.push({x: i, y: i})
        }

        let score = [];
        let timeLeft = [];
        let livesLeft = [];

        this.state.flightRecords.forEach((element, index) => {
            score.push({x: index, y: element.score})
            timeLeft.push({x: index, y: 60000 - element.timeLeft})
            livesLeft.push({x: index, y: element.livesLeft})
        })

        this.setState({
            totalFlightData: {
                first: score,
                second: timeLeft.map(temp => {
                    return {
                        x: temp.x,
                        y: temp.y / 250
                    }
                }),
                third: livesLeft
            },
            funTimeData: fun,
            scoreFlightData: score,
            timeFlightData: timeLeft,
            livesFlightData: livesLeft,
            summaryReady: true
        })
    }

    componentWillMount() {
        FlightBox.getFlightRecords().then((res) => {
            this.setState({
                flightRecords: JSON.parse(res)
            }, () => {
                this.calculateSummaryDashboard();
                this.populateOptions();
            });
        });
    }

    render() {
        return (
            <div className='stats-wrapper'>
                <div className="StatsModalContainer">
                <div className='main-graph'>
                    {this.state.graph}
                </div>
                {this.state.summaryReady ? (
                    <div className='selection'>
                        <h1>Selected Graph:</h1>
                        <h3>{this.state.selectedGraph}</h3>
                        <div className='type-toggle-container'>
                            <button onClick={this.turnOnAll}>Summary</button>
                            <button onClick={this.turnOnSelect}>Select Flight</button>
                        </div>
                        <div className='choices'>
                            {this.state.isAllView ? (
                                <div>
                                    <h3 onClick={() => this.selectGraph('total-flight')}>Total Flight</h3>
                                    <h3 onClick={() => this.selectGraph('fun-time')}>Fun / Time</h3>
                                    <h3 onClick={() => this.selectGraph('score-flight')}>Score / Flight</h3>
                                    <h3 onClick={() => this.selectGraph('time-flight')}>Time / Flight</h3>
                                    <h3 onClick={() => this.selectGraph('lives-flight')}>Lives / Flight</h3>
                                    <h3 onClick={() => this.selectGraph()}>Black Hole</h3>
                                </div>
                            ) : (
                                <div>
                                    <select onChange={this.fetchData} ref={this.selectGroup}>
                                        <option value={undefined}>Please Select Flight</option>
                                        {this.state.options}
                                    </select>
                                    {this.state.optionSelected ? (
                                        <div>
                                            <h3 onClick={() => this.selectGraph('direction-radar')}>Direction Radar</h3>
                                            <h3 onClick={() => this.selectGraph('rockets-radar')}>Rockets Radar 3000</h3>
                                            <h3 onClick={() => this.selectGraph('positon-heatmap')}>Position Heatmap</h3>
                                            <h3 onClick={() => this.selectGraph('speed-time')}>Speed / Time</h3>
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='selection'>
                        <h1>Loading</h1>
                    </div>
                )}
                </div>
            </div>
        );
    }
}

export default StatsModal;
