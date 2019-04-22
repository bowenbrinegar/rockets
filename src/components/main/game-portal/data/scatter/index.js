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
        this.changeScatter = this.changeScatter.bind(this);
        this.updateChart = this.updateChart.bind(this);
    }

    createChart() {
        var ctx = document.getElementsByClassName("chartjs-scatter");

        var data = [];

        var options = {
            responsive: true, 
            maintainAspectRatio: false, 
        };

        var chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Rocket',
                    data: data, 
                    borderColor: '#2196f3',      
                    backgroundColor: '#2196f3',
                }]
            },
            options: options
        });

        this.setState({
            chart
        })
    }
    
    changeScatter(chart, label, data) {
        this.state.chart.data.datasets.forEach((dataset) => {
        if(dataset.label == label){
            dataset.data = data;
        }  
        });
        this.state.chart.update();
    }

    updateChart() {
        const scatterInterval = setInterval(() => {
            const arr = this.props.positionData
            const last50 = arr.slice(Math.max(arr.length - 50, 1))
            this.changeScatter(this.state.chart, "Rocket", last50);
        }, 250)

        this.props.attachScatterInterval(scatterInterval);
    }

    componentDidMount() {
        this.createChart();
        this.props.attachScatterInvoke(this.updateChart);
    }

    render() {
        return (
            <div className="ScatterContainer">
                <canvas className='chartjs-scatter'></canvas>
            </div>
        );
    }
}

export default Scatter;
