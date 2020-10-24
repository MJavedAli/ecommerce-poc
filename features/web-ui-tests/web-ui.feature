Feature: Laptop Purchase Test

    @Exercise-2 @WEB
    Scenario Outline: To verify that the user is purchase laptop products successfully
        Given I am on Demoblaze Home page
        When I navigate to Laptop section
        Then Add "<Laptops>" to cart
        Then I navigate to cart
        Then Delete "<productToRemove>" from cart
        Then Click on Place Order
        Then Fill all the Purchase details with "<user>" and Purchase
        Then Capture log purchase ID and Amount
        Then Assert the purchase amount
        And Click on OK
        Examples:
            | Laptops     | productToRemove | user      |
            | UC1_LAPTOPS | UC1_LAPTOPS     | TESTUSER1 |

