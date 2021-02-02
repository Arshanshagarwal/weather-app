import React, { Component } from "react";
import "./blocks.style.css";

class Blocks extends Component {
  state = {
    name: "",
    item: "",
  };
  constructor(props) {
    super(props);
    this.state.name = props.name;
    this.state.item = props.item;
  }
  render() {
    return (
      <>
        <div className="blocks">
          <div className="item-details">{this.state.item}</div>
          <div className="item-tag">{this.state.name}</div>
        </div>
      </>
    );
  }
}

export default Blocks;
