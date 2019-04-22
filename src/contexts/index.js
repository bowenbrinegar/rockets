import React, { Component } from 'react';

export const PageContext = React.createContext();

export class PageProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPortal: false,
            score: 0,
            lives: 3,
            time: 60000,
            gameTimerObject: null,
            prevScore: 0,
            prevLives: 3,
            prevTime: 60000,
            boostData: 360,
            speedData: [],
            positionData: [],
            hoopPositionData: [],
            asteriodPositionData: [],
            lineChartInterval: null,
            lineChartIntervalInvoke: null,
            gaugeInterval: null,
            gaugeIntervalInvoke: null,
            scatterInterval: null,
            scatterIntervalInvoke: null,
            projectileInterval: null,
            projectileIntervalInvoke: null,
        }

        this.onClick = this.onClick.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.startGameTimer = this.startGameTimer.bind(this);
        this.stopGameTimer = this.stopGameTimer.bind(this);
        this.decrementLife = this.decrementLife.bind(this);
        this.incrementScore = this.incrementScore.bind(this);
        
        this.recordPreviousScores = this.recordPreviousScores.bind(this);

        this.attachLineChartInterval = this.attachLineChartInterval.bind(this);
        this.attachLineChartInvoke = this.attachLineChartInvoke.bind(this);
        this.postSpeedPoint = this.postSpeedPoint.bind(this);

        this.decrementBoostGauge = this.decrementBoostGauge.bind(this);
        this.attachGaugeInterval = this.attachGaugeInterval.bind(this);
        this.attachGaugeInvoke = this.attachGaugeInvoke.bind(this);

        this.postPositionPoint = this.postPositionPoint.bind(this);
        this.attachScatterInterval = this.attachScatterInterval.bind(this);
        this.attachScatterInvoke = this.attachScatterInvoke.bind(this);

        this.attachProjectileInterval = this.attachProjectileInterval.bind(this);
        this.attachProjectileInvoke = this.attachProjectileInvoke.bind(this);

        this.postAsteriodPositionPoints = this.postAsteriodPositionPoints.bind(this);
        this.postHoopPositionPoints = this.postHoopPositionPoints.bind(this);
    }

    onClick() {
        this.setState({
            openPortal: true
        })
    }

    startGameTimer(fromPause=false) {
        const gameTimer = setInterval(() => {
            if (this.state.time > 0) {
                this.setState({
                    time: this.state.time - 250
                })
            }
        }, 250)

        if (!fromPause) {
            this.state.lineChartIntervalInvoke();
            this.state.gaugeIntervalInvoke()
            this.state.scatterIntervalInvoke()
            this.state.projectileIntervalInvoke()
        }

        this.setState({
            gameTimerObject: gameTimer
        })
    }

    stopGameTimer() {
        clearInterval(this.state.gameTimerObject);
    }

    decrementLife() {
        this.setState({
            lives: this.state.lives - 1 
        })
    }

    incrementScore() {
        this.setState({
            score: this.state.score + 100
        })
    }

    recordPreviousScores() {
        this.setState({
            prevScore: this.state.score,
            prevLives: this.state.lives,
            prevTime: this.state.time
        }, () => {
            this.resetGame();
        })
    }

    resetGame() {
        clearInterval(this.state.lineChartInterval);
        clearInterval(this.state.gaugeInterval);
        clearInterval(this.state.scatterInterval);
        clearInterval(this.state.projectileInterval);

        this.setState({
            score: 0,
            lives: 3,
            time: 60000,
            gameInProgress: false,
            speedData: [],
            positionData: [],
            boostData: 360
        })
    }

    postSpeedPoint(point) {
        this.setState({
            speedData: [...this.state.speedData, { x: 60000 - this.state.time , y: point }]
        })
    }

    attachLineChartInterval(interval) {
        this.setState({
            lineChartInterval: interval
        });
    }

    attachLineChartInvoke(functionCall) {
        this.setState({
            lineChartIntervalInvoke: functionCall
        })
    }

    decrementBoostGauge() {
        this.setState({
            boostData: this.state.boostData - 1.5
        })
    }
   
    attachGaugeInterval(interval) {
        this.setState({
            gaugeInterval: interval
        });
    }

    attachGaugeInvoke(functionCall) {
        this.setState({
            gaugeIntervalInvoke: functionCall
        })
    }

    postPositionPoint(point) {
        this.setState({
            positionData: [...this.state.positionData, point]
        })
    }

    attachScatterInterval(interval) {
        this.setState({
            scatterInterval: interval
        });
    }

    attachScatterInvoke(functionCall) {
        this.setState({
            scatterIntervalInvoke: functionCall
        })
    }

    attachProjectileInterval(interval) {
        this.setState({
            projectileInterval: interval
        });
    }

    attachProjectileInvoke(functionCall) {
        this.setState({
            projectileIntervalInvoke: functionCall
        })
    }

    postAsteriodPositionPoints(data) {
        this.setState({
            asteriodPositionData: [...this.state.asteriodPositionData, data]
        })
    }

    postHoopPositionPoints(data) {
        this.setState({
            hoopPositionData: [...this.state.hoopPositionData, data]
        })
    }

    render() {
        return (
            <PageContext.Provider value={{
                ...this.state, 
                onClick: this.onClick,
                startGameTimer: this.startGameTimer,
                stopGameTimer: this.stopGameTimer,
                resetGame: this.resetGame,
                decrementLife: this.decrementLife,
                incrementScore: this.incrementScore,
                recordPreviousScores: this.recordPreviousScores,
                postSpeedPoint: this.postSpeedPoint,
                attachLineChartInterval: this.attachLineChartInterval,
                attachLineChartInvoke: this.attachLineChartInvoke,
                decrementBoostGauge: this.decrementBoostGauge,
                attachGaugeInterval: this.attachGaugeInterval,
                attachGaugeInvoke: this.attachGaugeInvoke,
                postPositionPoint: this.postPositionPoint,
                attachScatterInterval: this.attachScatterInterval,
                attachScatterInvoke: this.attachScatterInvoke,
                attachProjectileInvoke: this.attachProjectileInvoke,
                attachProjectileInterval: this.attachProjectileInterval,
                postAsteriodPositionPoints: this.postAsteriodPositionPoints,
                postHoopPositionPoints: this.postHoopPositionPoints
            }}>
                {this.props.children}
            </PageContext.Provider>
        )
    }
}