import React, { Component } from 'react';
import './index.css';
import { Chart } from 'react-chartjs-2';

class Projectile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chart: null
        }

        this.createChart = this.createChart.bind(this);
        this.changeProjectile = this.changeProjectile.bind(this);
        this.updateChart = this.updateChart.bind(this);
    }

    createChart() {
        var ctx = document.getElementsByClassName("chartjs-projectile");

        var rocketData = [];
        var asteriodData = [];
        var hoopData = [];

        var options = {
            responsive: true, 
            maintainAspectRatio: false, 
        };

        var chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Rocket',
                        data: rocketData, 
                        borderColor: '#2196f3',      
                        backgroundColor: '#2196f3',
                    },
                    {
                        label: 'Asteriods',
                        data: asteriodData, 
                        borderColor: '#FF0000',      
                        backgroundColor: '#FF0000',
                    },
                    {
                        label: 'Hoops',
                        data: hoopData, 
                        borderColor: '#00FF00',      
                        backgroundColor: '#00FF00',
                    }
                ]
            },
            options: options
        });

        this.setState({
            chart
        })
    }
    
    changeProjectile(chart, label, data) {
        this.state.chart.data.datasets.forEach((dataset) => {
            if (dataset.label === label){
                dataset.data = data;
            }  
        });
        this.state.chart.update();
    }

    updateChart() {
        const projectileInterval = setInterval(() => {
            if (this.props.asteriodPositionData.length && this.props.positionData.length && this.props.hoopPositionData.length) {
                this.changeProjectile(this.state.chart, "Rocket", [this.props.positionData[this.props.positionData.length - 1]]);
                this.changeProjectile(this.state.chart, "Asteriods", this.props.asteriodPositionData[this.props.asteriodPositionData.length - 1]);
                this.changeProjectile(this.state.chart, "Hoops", this.props.hoopPositionData[this.props.hoopPositionData.length - 1]);
            }
        }, 250)

        this.props.attachProjectileInterval(projectileInterval);
    }

    componentDidMount() {
        this.createChart();
        this.props.attachProjectileInvoke(this.updateChart);
    }

    render() {
        return (
            <div className="ProjectileContainer">
                <canvas className='chartjs-projectile'></canvas>
            </div>
        );
    }
}

export default Projectile;
