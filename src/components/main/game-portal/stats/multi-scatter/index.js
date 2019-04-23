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
    }

    createChart() {
        var ctx = document.getElementsByClassName("multi-scatter");

        var data = this.props.data;
        var options = {
            responsive: true, 
            maintainAspectRatio: false, 
        };

        var chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: this.props.label1,
                        data: data.first, 
                        borderColor: '#2196f3',      
                        backgroundColor: '#2196f3',
                    },
                    {
                        label: this.props.label2,
                        data: data.second, 
                        borderColor: '#FF0000',      
                        backgroundColor: '#FF0000',
                    },
                    {
                        label: this.props.label3,
                        data: data.third, 
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
    
    componentDidMount() {
        this.createChart();
    }

    render() {
        return (
            <div className="MultiScatter">
                <canvas className='multi-scatter'></canvas>
            </div>
        );
    }
}

export default Projectile;
