import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { extractLocations, getEvents } from './api';
import { WarningAlert} from './Alert';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';



class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: "all",
    alertText: "",
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
          "You are offline. For updated events, connect Z's Meet App to the internet.",
      });
    } else {
      this.setState({ alertText: "" });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return {city, number};
    })
    return data;
  };

  render() {
    return (
      <div className="App">
        <h1>Z's Meet App</h1>
        <h3>Enter a City</h3>
        <WarningAlert text={this.state.alertText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents}
         updateEvents={this.updateEvents} />
         <h4>Events in each city</h4>
      <div className="data-vis-wrapper">
      <EventGenre
            locations={this.state.locations}
            events={this.state.events}
          />
        <ResponsiveContainer height={400} >
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="city" />
        <YAxis
          allowDecimals={false}
          type="number"
          dataKey="number"
          name="number of events"
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={this.getData()} fill="#8884d8" />
        </ScatterChart>
        </ResponsiveContainer>
      </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;