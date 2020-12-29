import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({
      numberOfEvents: value,
    });

    if (value < 1 || value >32) {
      this.setState({
        infoText: "Choose a number of events between 1 and 32",
      });
    } else {
      this.setState({
        infoText: "",
      });
    }
  };

  render() {
    return (
      <div className="number-of-events">
        <br /><br />
        <ErrorAlert text={this.state.infoText} />
        <label className="number-of-events-label">Choose the Number of Events</label>
        <br /><br />
        <input
          type="number"
          className="event-number"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        ></input>
        <br /><br /><br />
      </div>
    );
  }
}

export default NumberOfEvents;