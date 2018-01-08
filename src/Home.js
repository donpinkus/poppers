import React, { Component } from "react";
import { connect } from "react-redux";

import Footer from "./Footer";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="Header">
          <h1>Poppers</h1>
          <h2>Show us which things are currently starting to pop</h2>
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(
  state => ({
    subSystems: state.subSystems
  }),
  {}
)(Home);
