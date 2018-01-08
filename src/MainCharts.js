import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import axios from "axios";

export default class MainCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    axios.get("/api/poppers").then(resp => {
      console.log("resp", resp.data);

      this.setState({
        data: resp.data.results
      });
    });
  }

  render() {
    if (!this.state.data) {
      return <div>loading</div>;
    }

    return (
      <div>
        <p className="Type-Weight-Medium">Coins with no data:</p>
        <p>
          {this.state.data.map(d => {
            if (d.data.length === 0) {
              return <span>{d.ticker}, </span>;
            }
          })}
        </p>
        <br />
        <p className="Type-Weight-Medium">Poppers</p>
        {this.state.data.map(d => {
          if (d.data.length === 0) return;

          return (
            <div>
              <p>{d.ticker}</p>
              {this.renderChart(d.data)}
            </div>
          );
        })}
      </div>
    );
  }

  renderChart(data) {
    console.log(data);

    const outputData = data.map(row => {
      return {
        time: new Date(row.time),
        close: row.close
      };
    });

    console.log(outputData);

    return <Chart data={outputData} />;
  }
}

// For each coin, show its time series
class Chart extends Component {
  render() {
    const data = this.props.data;

    return (
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="close" stroke="#E51A44" dot={false} />
      </LineChart>
    );
  }
}
