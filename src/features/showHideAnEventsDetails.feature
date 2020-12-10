Feature: Show/hide an events details

Scenario: An event element is collapsed by default
Given the list of events has been loaded
When the user looks at the event list
Then each event in the list should be collapsed by default

Scenario: User can expand an event to see its details
Given the list of events has been loaded
When the user clicks on an events show details button
Then the event should expand to show its details to the user

Scenario: User can collapse an event to hide its details
Given an event element has been expanded
When the user clicks on the hide details button of an expanded event
Then the event should collapse to hide its details from the user