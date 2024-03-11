Feature: User Stories
    Scenario: As an un-authenticated public user, I want to view all the wildfires from the year 2023
        Given that I am a public user and I can access a browser
        When I navigate to the application link
        Then I can view all the wildfires from the year 2023

    Scenario: As an un-authenticated public user, I want to filter the wildfires from the year 2023 by FIRE_STATUS, FIRE_CAUSE and GEOGRAPHIC_DESCRIPTION
        Given that I am a public user and can access the application in a browser and I can view all the wildfires
        When I change any filter
        Then I can view the filtered wildfires

    Scenario: As an un-authenticated public user, I want to download the result set into a csv or a text file
        Given that I am a public user and can access the application in a browser and I can view all or filtered wildfires
        When I click `download` button
        Then I can download all or filtered wildfires list in csv or text file formats