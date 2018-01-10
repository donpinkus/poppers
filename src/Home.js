import React, { Component } from "react";
import { connect } from "react-redux";

import Currency from "./Currency";
import Footer from "./Footer";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="Header">
          <h1>test</h1>
          <h2>
            Live tracking of coins that are popping (more than 30% growth in
            past 24-hrs).
          </h2>
        </div>

        <Currency />

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
