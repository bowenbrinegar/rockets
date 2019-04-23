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
    }

    createChart() {
        var ctx = document.getElementsByClassName("line");

        var data = this.props.data;

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
                    label: this.props.label,
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
    
    
    componentDidMount() {
        this.createChart();
    }

    render() {
        return (
            <div className="StatsLineContainer">
                <canvas className='line'></canvas>
            </div>
        );
    }
}

export default Scatter;
