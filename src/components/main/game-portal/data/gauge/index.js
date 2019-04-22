import React, { Component } from 'react';
import './index.css';
import { Chart } from 'react-chartjs-2';

class Gauge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chart: null,
            accelerating: false  
        }

        this.createChart = this.createChart.bind(this);
        this.changeGauge = this.changeGauge.bind(this);
        this.updateChart = this.updateChart.bind(this);
    }


    createChart() {
        var ctx = document.getElementsByClassName("chartjs-gauge");
        var chart = new Chart(ctx, {
            type:"doughnut",
            data: {
                labels : ["Red","Blue"],
                datasets: [{
                    label: "Gauge",
                    data : [180, 0],
                    backgroundColor: [
                        "rgb(54, 162, 235)",
                        "rgb(255, 99, 132)",
                        "rgb(255, 205, 86)"
                    ]
                }]
            },
            options: {
                circumference: Math.PI,
                rotation : Math.PI,
                maintainAspectRatio: false, 
                cutoutPercentage : 80, // precent
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                }
            }
        });

        this.setState({
            chart
        })
    }
    
    changeGauge(chart, label, data) {
        this.state.chart.data.datasets.forEach((dataset) => {
            if (dataset.label === label){
                dataset.data = data;
            }  
        });
        this.state.chart.update();
    }

    updateChart() {
        const gaugeInterval = setInterval(() => {
            this.changeGauge(this.state.chart, "Gauge", [this.props.boostData / 2, 180 - this.props.boostData / 2]);
        }, 250)

        this.props.attachGaugeInterval(gaugeInterval);
    }

    componentDidMount() {
        this.createChart();
        this.props.attachGaugeInvoke(this.updateChart);
    }

    render() {
        return (
            <div className="GaugeContainer">
                <canvas className='chartjs-gauge'></canvas>
            </div>
        );
    }
}

export default Gauge;
