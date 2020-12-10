import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper;
    let EventWrapper;
    given('the list of events has been loaded', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('.EventList')).toHaveLength(1);
    });

    when('the user looks at the event list', () => {
    });

    then('each event in the list should be collapsed by default', () => {
        EventWrapper = mount(<Event event={mockData[0]} />);
        expect(EventWrapper.state('showDetails')).toEqual(false);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper;
    let EventWrapper;
    given('the list of events has been loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('the user clicks on an events show details button', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      expect(EventWrapper.state('showDetails')).toEqual(false);
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event should expand to show its details to the user', () => {
      expect(EventWrapper.state('showDetails')).toBe(true);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let EventWrapper;
    given('an event element has been expanded', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.find('.details-btn').simulate('click');
      expect(EventWrapper.state('showDetails')).toBe(true);
    });

    when('the user clicks on the hide details button of an expanded event', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event should collapse to hide its details from the user', () => {
      expect(EventWrapper.state('showDetails')).toBe(false);
    });
  });
});