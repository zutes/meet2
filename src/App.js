import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { WarningAlert} from './Alert';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: "all",
  };

  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          currentLocation === "all"
            ? events
            : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events,
          locations: extractLocations(events),
        });
      }
    });
    window.addEventListener("online", this.WarningAlert());
  }

  WarningAlert = () => {
    if (navigator.onLine === false) {
      this.setState({
        alertText:
          "You are not connected to the internet. To receive updated events, please connect online",
      });
    } else {
      this.setState({ alertText: "" });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <h1>Z's Meet App</h1>
        <h3>Enter a City</h3>
        <WarningAlert text={this.state.alertText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents} />
      </div>
    );
  }
}

export default App;