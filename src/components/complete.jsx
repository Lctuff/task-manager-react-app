import React, { Component } from "react";

class Complete extends Component {
  formatComplete() {
    const { completed } = this.props.tasks;
    return completed === true ? "Completed" : "Complete";
  }
  render() {
    return (
      <button
        className="btn btn-primary"
        onClick={() => this.props.onComplete(this.props.tasks)}
      >
        {this.formatComplete()}
      </button>
    );
  }
}

export default Complete;
