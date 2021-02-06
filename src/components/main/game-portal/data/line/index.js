import React, { Component } from 'react';
import './index.css';
import { Chart } from 'react-chartjs-2';

class Scatter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chart: null
        }

        this.createChart = this.createChart.bind(this);
        this.changeLine = this.changeLine.bind(this);
        this.updateChart = this.updateChart.bind(this);
    }

    createChart() {
        var ctx = document.getElementsByClassName("chartjs-line");

        var data = this.props.speedData;

        var options = {
            responsive: true, 
            maintainAspectRatio: false, 
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        };

        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Acceleration',
                    data: data, 
                    borderColor: '#2196f3',      
                }]
            },
            options: options
        });

        this.setState({
            chart
        })
    }
    
    changeLine(chart, label, data) {
        this.state.chart.data.datasets.forEach((dataset) => {
        if(dataset.label === label){
            dataset.data = data;
        }  
        });
        this.state.chart.update();
    }

    updateChart() {
        const lineChartInterval = setInterval(() => {
            const arr = this.props.speedData
            const last50 = arr.slice(Math.max(arr.length - 50, 1))
            this.changeLine(this.state.chart, "Acceleration", last50);
        }, 250)

        this.props.attachLineChartInterval(lineChartInterval);
    }

    componentDidMount() {
        this.createChart();
        this.props.attachLineChartInvoke(this.updateChart);
    }

    render() {
        return (
            <div className="LineContainer">
                <canvas className='chartjs-line'></canvas>
            </div>
        );
    }
}

export default Scatter;
