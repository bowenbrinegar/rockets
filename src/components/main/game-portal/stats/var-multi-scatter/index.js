import React, { Component } from 'react';
import './index.css';
import { Chart } from 'react-chartjs-2';

class VarMultiScatter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chart: null,
            currentTimeBlock: 0,
            firstMappings: null,
            secondMappings: null,
            thirdMappings: null
        }

        this.createChart = this.createChart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeScatter = this.changeScatter.bind(this);
        this.updateChart = this.updateChart.bind(this);
    }

    createChart() {
        var ctx = document.getElementsByClassName("multi-scatter");
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
                        data: this.state.firstMappings[this.state.currentTimeBlock], 
                        borderColor: '#2196f3',      
                        backgroundColor: '#2196f3',
                    },
                    {
                        label: this.props.label2,
                        data: this.state.secondMappings[this.state.currentTimeBlock], 
                        borderColor: '#FF0000',      
                        backgroundColor: '#FF0000',
                    },
                    {
                        label: this.props.label3,
                        data: this.state.thirdMappings[this.state.currentTimeBlock], 
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

    changeScatter(chart, label, data) {
        this.state.chart.data.datasets.forEach((dataset) => {
            if (dataset.label === label){
                dataset.data = data;
            }  
        });
        this.state.chart.update();
    }

    updateChart() {
        this.changeScatter(this.state.chart, this.props.label1, this.state.firstMappings[this.state.currentTimeBlock]);
        this.changeScatter(this.state.chart, this.props.label2, this.state.secondMappings[this.state.currentTimeBlock]);
        this.changeScatter(this.state.chart, this.props.label3, this.state.thirdMappings[this.state.currentTimeBlock]);
    }
    
    handleChange(e) {
        const { value } = e.target;
        this.setState({
            currentTimeBlock: value
        }, this.updateChart)
    }

    componentDidMount() {
        const data = this.props.data;

        const firstMappings = data.first.map(d => {
            return [{x: d.x_pos, y: d.y_pos}]
        })

        const secondMappings = data.second.map(d => {
            return d.asteriods.map(point => {
                return {x: point.x_pos, y: point.y_pos}
            })
        });

        const thirdMappings = data.third.map(d => {
            return d.hoops.map(point => {
                return {x: point.x_pos, y: point.y_pos}
            })
        });

        this.setState({
            firstMappings,
            secondMappings,
            thirdMappings
        }, this.createChart)
    }

    render() {
        return (
            <div className="MultiScatter">
                <canvas className='multi-scatter'></canvas>
                <input onChange={this.handleChange} type="range" name="points" min="0" max={this.props.data.first.length - 1}/>
            </div>
        );
    }
}

export default VarMultiScatter;
