Feature: Rest API Automation

    @API @GETPET @Exercise-1
    Scenario Outline: To verify the response for get available pets
        Given I request to get "<status>" pets and assert
        Examples:
            | status    |
            | available |
    @API @CREATE @UPDATE @DELETE @Exercise-1
    Scenario Outline: To verify the adding a new pet and update status
        Given Post a new available pet to the store for "<scenario>" and assert new pet added
        Then I update the status to "<status>" and assert
        Then I delete the added pet and assert
        Examples:
            | scenario | status |
            | VALIDPET | sold   |








