import React, { Component } from 'react';
import './index.css';
import CommandCenter from './command-center';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posX: 0,
            posY: 0,
            isMovingLeft: false,
            isMovingRight: false,
            isMovingUp: false,
            asteriods: [],
            hoops: [],
            gameOver: true,
            hidecountDown: false,
            countDown: 5,
            countDownObject: null,
            newGameClick: false,
            clientWidth: null,
            ROCKET_HEIGHT: 0,
            ROCKET_WIDTH: 0,
            ASTERIOD_HEIGHT: 0,
            ASTERIOD_WIDTH: 0,
            HOOP_HEIGHT: 0,
            HOOP_WIDTH: 0,
            partyModeEnabled: false,
            spaceColors: ['red', 'green', 'blue', 'purple', 'orange', 'teal'],
            spaceColor: 'grey',
            prevYPosition: null,
            paused: false
        }

        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.gravity = this.gravity.bind(this);
        this.renderAsteriods = this.renderAsteriods.bind(this);
        this.asteriodTracker = this.asteriodTracker.bind(this);
        this.hoopGenerator = this.hoopGenerator.bind(this);
        this.hoopTracker = this.hoopTracker.bind(this);

        this.startGameAfterGameIsOver = this.startGameAfterGameIsOver.bind(this);
        this.startGame = this.startGame.bind(this);
        this.endGame = this.endGame.bind(this);

        this.pause = this.pause.bind(this);
        this.partyMode = this.partyMode.bind(this);
        this.rotateColors = this.rotateColors.bind(this);

        this.onResize = this.onResize.bind(this);
        this.checkZoom = this.checkZoom.bind(this);

        this.collectData = this.collectData.bind(this);

        this.space = React.createRef();

        this.baseAsteriod = React.createRef();
        this.baseHoop = React.createRef();
        this.baseRocket = React.createRef();

    }

    keyDown(e) {
        const keycode = e.code;

        if (keycode === 'ArrowLeft') { 
            this.setState({
                isMovingLeft: true
            })
            this.moveLeft();
        } else if (keycode === 'ArrowRight') { 
            this.setState({
                isMovingRight: true
            })
            this.moveRight();
        } else if (keycode === 'ArrowUp') {
            this.setState({
                isMovingUp: true
            })
            this.moveUp();
        }
    }

    keyUp(e) {
        const keycode = e.code;

        if (keycode === 'ArrowLeft') { 
            this.setState({
                isMovingLeft: false
            })
        } else if (keycode === 'ArrowRight') { 
            this.setState({
                isMovingRight: false
            })
        } else if (keycode === 'ArrowUp') {
            this.setState({
                isMovingUp: false
            })
        }
    }

    moveLeft() {
        this.setState({
            posX: this.state.posX - 15
        })

        if (this.state.isMovingLeft) {
            setTimeout(this.moveLeft, 50);
        }
    }

    moveRight() {
        this.setState({
            posX: this.state.posX + 15
        })

        if (this.state.isMovingRight) {
            setTimeout(this.moveRight, 50);
        }
    }

    moveUp() {
        if (this.props.boostData > 0) {
            this.setState({
                posY: this.state.posY - 30
            })
    
            this.props.decrementBoostGauge();
    
            if (this.state.isMovingUp) {
                setTimeout(this.moveUp, 50);
            }
        }
    }
 
    gravity() {
        if (!this.state.gameOver && !this.state.paused) {
            if (this.state.posY < this.space.current.clientHeight / 1.3) {
                this.setState({
                    posY: this.state.posY + 10
                })
            }

            if (this.props.lives < 1 || this.props.time < 1) {
                this.endGame();
            }

            setTimeout(this.gravity, 50);
        }
    }

    partyMode() {
        if (!this.state.partyModeEnabled) {
            this.setState({
                partyModeEnabled: true
            }, () => {
                this.rotateColors()
            })
        } else {
            this.setState({
                partyModeEnabled: false,
                spaceColor: 'grey'
            })
        }
    }

    rotateColors() {
        if (this.state.partyModeEnabled) {
            this.setState({
                spaceColor: this.state.spaceColors[Math.floor(Math.random() * 6)]
            })

            setTimeout(this.rotateColors, 100)
        }
    }

    renderAsteriods() {
        if (!this.state.gameOver && !this.state.paused) {
            const bucketOfAsteriods = [];

            bucketOfAsteriods.push({
                x: Math.floor(Math.random() * this.space.current.clientWidth) + 1,
                y: 0,
                rightBound:  Math.random() >= 0.5
            });

            this.setState({
                asteriods: [...this.state.asteriods, ...bucketOfAsteriods]
            })

            setTimeout(this.renderAsteriods, 2500);
        }
    }

    asteriodTracker() {
        if (!this.state.gameOver && !this.state.paused) {

            const newPositioning = this.state.asteriods.map(astr => {
                if (astr.y > this.space.current.clientHeight) {
                    astr.destroyed = true;
                    return astr;
                }

                if (astr.x + 100 > this.space.current.clientWidth) {
                    astr.rightBound = false;
                } else if (astr.x < 0) {
                    astr.rightBound = true;
                }

                if (astr.rightBound) {
                    astr = {
                        x: astr.x + Math.floor(Math.random() * 5),
                        y: astr.y + Math.floor(Math.random() * 5),
                        rightBound: astr.rightBound,
                        styled: astr.styled
                    }
                } else {
                    astr = {
                        x: astr.x - Math.floor(Math.random() * 5),
                        y: astr.y + Math.floor(Math.random() * 5),
                        rightBound: astr.rightBound,
                        styled: astr.styled
                    }
                } 

                const RocketRect = {
                    topY: this.state.posY,
                    bottomY: this.state.posY + this.state.ROCKET_HEIGHT,
                    leftX: this.state.posX,
                    rightX: this.state.posX + this.state.ROCKET_WIDTH
                }

                const AsteriodRect = {
                    topY: astr.y,
                    bottomY: astr.y + this.state.ASTERIOD_HEIGHT,
                    leftX: astr.x,
                    rightX: astr.x + this.state.ASTERIOD_WIDTH
                }

                if (!astr.styled) {
                    const isIntersect = this.checkIntersect(RocketRect, AsteriodRect);
                    
                    if (isIntersect) {
                        astr.styled = true;
                        this.props.decrementLife();
                    }
                }
                
                return astr;
            })

            const notDestoryed = newPositioning.filter(astr => !astr.destroyed)

            this.setState({
                asteriods: notDestoryed
            })

            setTimeout(this.asteriodTracker, 25);
        }
    }

    hoopGenerator() {
        if (!this.state.gameOver && !this.state.paused) {
            const bucketOfHoops = [];

            bucketOfHoops.push({
                x: Math.floor(Math.random() * this.space.current.clientWidth) + 1,
                y: 0,
                destroyed: false
            });

            this.setState({
                hoops: [...this.state.hoops, ...bucketOfHoops]
            })

            setTimeout(this.hoopGenerator, 2000);
        }
    }

    hoopTracker() {
        if (!this.state.gameOver && !this.state.paused) {

            const newPositioning = this.state.hoops.map(hoop => {
                if (hoop.y > this.space.current.clientHeight) {
                    hoop.destroyed = true;
                    return hoop;
                }

                const newHoop = {
                    x: hoop.x,
                    y: hoop.y + Math.floor(Math.random() * 5),
                    styled: hoop.styled
                }

                const RocketRect = {
                    topY: this.state.posY,
                    bottomY: this.state.posY + this.state.ROCKET_HEIGHT,
                    leftX: this.state.posX,
                    rightX: this.state.posX + this.state.ROCKET_WIDTH
                }

                const HoopRect = {
                    topY: newHoop.y,
                    bottomY: newHoop.y + this.state.HOOP_HEIGHT,
                    leftX: newHoop.x,
                    rightX: newHoop.x + this.state.HOOP_WIDTH
                }

                if (!newHoop.styled) {
                    const isIntersect = this.checkIntersect(RocketRect, HoopRect);
                    
                    if (isIntersect) {
                        newHoop.styled = true;
                        this.props.incrementScore();

                        this.setState({
                            points: this.state.points + 1
                        })
                    }
                }
                
                return newHoop;
            });

            const notDestoryed = newPositioning.filter(hoop => !hoop.destroyed)

            this.setState({
                hoops: notDestoryed
            })

            setTimeout(this.hoopTracker, 25);
        }
    }

    checkIntersect(Rect1, Rect2) {
        let topY;
        let bottomY;
        let leftX;
        let rightX;

        if (Rect1.topY > Rect2.topY) {
            topY = Rect1.topY;
        } else {
            topY = Rect2.topY;
        }

        if (Rect1.bottomY < Rect2.bottomY) {
            bottomY = Rect1.bottomY;
        } else {
            bottomY = Rect2.bottomY;
        }

        if (Rect1.leftX > Rect2.leftX) {
            leftX = Rect1.leftX;
        } else {
            leftX = Rect2.leftX;
        }

        if (Rect1.rightX < Rect2.rightX) {
            rightX = Rect1.rightX;
        } else {
            rightX = Rect2.rightX;
        }

        if (topY > bottomY || leftX > rightX) {
            return false;
        } else {
            return true;
        }
    }

    startCountDown() {
        const countDown = setInterval(() => {
            this.setState({
                countDown: this.state.countDown - 1 
            });
        }, 1000)

        this.setState({
            countDownObject: countDown
        })
    }

    startGame() {
        this.setState({
            countDown: 5,
            newGameClick: true
        });

        clearInterval(this.state.countDownObject);
        this.startCountDown()

        if (this.state.gameOver) {
            setTimeout(this.startGameAfterGameIsOver, 5000);
        } else {
            this.endGame().then(this.startGameAfterGameIsOver);
        }
    }

    startGameAfterGameIsOver() {
        this.setState({
            gameOver: false,
            hidecountDown: true
        });
        
        clearInterval(this.state.countDownObject);

        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        
        this.gravity();

        this.collectData();

        this.renderAsteriods();
        this.asteriodTracker();

        this.hoopGenerator();
        this.hoopTracker();

        this.props.startGameTimer();

        setTimeout(() => {
            this.setState({
                newGameClick: false
            });
        }, 5000);
    }

    pause() {
        if (!this.state.gameOver) {
            if (!this.state.paused) {
                this.setState({
                    paused: true
                })
    
                this.props.stopGameTimer();
            } else {
                this.setState({
                    paused: false
                }, () => {
                    this.gravity();
    
                    this.collectData();
        
                    this.renderAsteriods();
                    this.asteriodTracker();
        
                    this.hoopGenerator();
                    this.hoopTracker();
        
                    this.props.startGameTimer(true);
                })
            }
        }
    }
    
    endGame() {
        const { current } = this.space;
        const promise = new Promise((resolve, reject) => {
            this.setState({
                posX: current.clientWidth / 2 - this.state.ROCKET_WIDTH / 2,
                posY: current.clientHeight / 1.3,
                asteriods: [],
                hoops: [],
                gameOver: true,
                isMovingLeft: false,
                isMovingRight: false,
                isMovingUp: false,
                countDown: 5,
                hidecountDown: false,
                prevYPosition: null,
                paused: false
            });
            
            clearInterval(this.props.gameTimerObject);
            this.props.recordPreviousScores();

            document.removeEventListener('keydown', this.keyDown);
            document.removeEventListener('keyup', this.keyUp);

            setTimeout(() => {
                resolve()
            }, 5000);
        });
        
        return promise;
    }

    collectData() {
        if (!this.state.gameOver && !this.state.paused) {
            const currentSpeed = (Math.abs(this.state.prevYPosition - this.state.posY) / 250) * 10000
            const newSpeedPoint = this.state.prevYPosition !== null ? currentSpeed > 1000 ? currentSpeed : 1000 : 100;

            this.props.postSpeedPoint(newSpeedPoint);

            this.setState({
                prevYPosition: this.state.posY
            })

            this.props.postPositionPoint({ x: this.state.posX, y: this.state.posY })

            const asteriodPositionings = this.state.asteriods.map(astr => {
                return {
                    x: astr.x,
                    y: astr.y
                }
            })

            const hoopPositionings = this.state.hoops.map(hoop => {
                return {
                    x: hoop.x,
                    y: hoop.y
                }
            })

            this.props.postAsteriodPositionPoints(asteriodPositionings)
            this.props.postHoopPositionPoints(hoopPositionings)

            setTimeout(this.collectData, 250)
        }
    }

    onResize() {
        const { current } = this.space;

        this.setState({
            posX: current.clientWidth / 2 - this.state.ROCKET_WIDTH / 2,
            posY: current.clientHeight / 1.3
        })
    }

    checkZoom() {
        if (this.state.clientWidth !== this.space.current.clientWidth) {
            this.setState({
                clientWidth: this.space.current.clientWidth,
                ROCKET_HEIGHT: this.baseRocket.current.clientHeight,
                ROCKET_WIDTH: this.baseRocket.current.clientWidth,
                ASTERIOD_HEIGHT: this.baseAsteriod.current.clientHeight,
                ASTERIOD_WIDTH: this.baseAsteriod.current.clientWidth,
                HOOP_HEIGHT: this.baseHoop.current.clientHeight,
                HOOP_WIDTH: this.baseHoop.current.clientWidth
            })

            this.onResize();
        }

        setTimeout(this.checkZoom, 100);
    }

    componentDidMount() {
        const { current } = this.space;

        this.checkZoom();

        this.setState({
            posX: current.clientWidth / 2 - this.state.ROCKET_WIDTH / 2,
            posY: current.clientHeight / 1.3
        })
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
    }

    render() {
         return (
            <div className="GameContainer">
                <div className='space' ref={this.space} style={{background: this.state.spaceColor}} >
                    { !this.state.hidecountDown ? (
                        <div className='current-stats'>
                            <div className='countdown-container'>
                                <h1>COUNTDOWN: {this.state.countDown}</h1>
                            </div>

                            { this.props.prevTime !== null ? (
                                <div class='previous-stats'>
                                    <div>
                                        <h1>Score: {this.props.prevScore}</h1>
                                        <h1>Lives Left: {this.props.prevLives}</h1>
                                        <h1>Time Left: {this.props.prevTime}</h1>
                                        <button>Submit Last Space Run</button>
                                    </div>
                                </div>
                            ) : null}

                        </div>
                    ) : null}
                    <div className='asteriods'>
                        {
                            this.state.asteriods.map(astr => {
                                if (astr.styled) {
                                    return  (
                                        <div className='asteriod' style={{left: astr.x, top: astr.y, color: 'red'}}>
                                            <h3>--<br/>/------\<br/>\------/<br/>--<br/></h3>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className='asteriod' style={{left: astr.x, top: astr.y}}>
                                            <h3>--<br/>/------\<br/>\------/<br/>--<br/></h3>
                                        </div>
                                    )
                                } 
                            })
                        }
                    </div>
                    <div className='hoops'>
                        {
                            this.state.hoops.map(hoop => {
                                if (hoop.styled) {
                                    return  (
                                        <div className='hoop' style={{left: hoop.x, top: hoop.y, color: 'green'}}>
                                            <h3>;(________________);</h3>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className='hoop' style={{left: hoop.x, top: hoop.y}}>
                                            <h3>;(________________);</h3>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className='rocket' style={{ left: this.state.posX, top: this.state.posY }}>
                        <h3 className='rocket-components body'>/\<br/>| |<br/>| |<br/>//|\\<br/>""</h3>
                        {
                            this.state.isMovingLeft ? (
                                <div>
                                    <h3 className='rocket-components flame-1' style={{marginLeft: '10px'}}>""</h3>
                                    <h3 className='rocket-components flame-2' style={{marginLeft: '20px'}}>""</h3>
                                </div>
                            ) : this.state.isMovingRight ? (
                                <div>
                                    <h3 className='rocket-components flame-1' style={{marginRight: '10px'}}>""</h3>
                                    <h3 className='rocket-components flame-2' style={{marginRight: '20px'}}>""</h3>
                                </div>
                            ) : (
                                <div>
                                    <h3 className='rocket-components flame-1'>""</h3>
                                    <h3 className='rocket-components flame-2'>""</h3>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='command-center'>
                    <CommandCenter startGame={this.startGame} newGameClick={this.state.newGameClick} partyMode={this.partyMode} pause={this.pause}/>
                </div>
                <div className='base-kit' style={{opacity: 0}}>
                    <h3 ref={this.baseAsteriod}>--<br/>/------\<br/>\------/<br/>--<br/></h3>
                    <h3 ref={this.baseHoop}>;(________________);</h3>
                    <h3 ref={this.baseRocket}>/\<br/>| |<br/>| |<br/>//|\\<br/>""</h3>
                </div>
            </div>
        );
    }
}

export default Game;
