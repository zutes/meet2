Feature: Specify Number of events

  Scenario: If user hasn’t specified a number, 32 is the default number.
    Given the user did not specify a number of events being shown
    When app loaded
    Then the default number of shown events is 32

  Scenario: User can change the number of events they want to see.
    Given the list of events has been loaded and the user did not specify a number of events he wants to see
    When the user specified a number
    Then the app should load a maximum of the specified number of events