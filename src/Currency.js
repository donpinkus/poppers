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
import * as d3 from "d3";
import axios from "axios";

export default class Currency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    axios.get("/api/poppers").then(resp => {
      this.setState({
        data: resp.data.results
      });
    });
  }

  render() {
    if (!this.state.data) {
      return <div>Data is loading!</div>;
    }

    const data = this.state.data;

    // This is an array of data correctly formated for our Chart component. The stuff we got back from the API is not the correct format.
    let ourNicerData = [];

    data.forEach(originalObject => {
      let newObject = {
        timestamp: new Date(originalObject.last_update * 1000).toJSON(),
        price: parseInt(originalObject.price_usd, 10)
      };

      ourNicerData.push(newObject);
    });

    const currency = "LTC";

    return (
      <div style={{ border: "1px solid red" }}>
        <div>Currency: {currency}</div>

        <Chart data={ourNicerData} />
      </div>
    );
  }
}

class James extends Component {
  render() {
    return <div>hello 4 james</div>;
  }
}

// For each coin, show its time series
class Chart extends Component {
  render() {
    console.log(this.props.data);

    const data = this.props.data;

    return (
      <LineChart
        width={1000}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="timestamp" tickCount={2} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#E51A44" dot={false} />
      </LineChart>
    );
  }
}
