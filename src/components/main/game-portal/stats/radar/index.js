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
        var ctx = document.getElementsByClassName("radar");

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
            type: 'radar',
            data: {
              labels: [
                "N", "NE", "E", "SE", "S", "SW", "W", "NW"],
              datasets: [{
                data: data,
                label: this.props.label,
                borderColor: '#2196f3',      
                backgroundColor: 'rgba(54, 162, 235, .2)',
              }]
            },
            options
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
            <div className="StatsRadarContainer">
                <canvas className='radar'></canvas>
            </div>
        );
    }
}

export default Scatter;
