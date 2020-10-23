Feature: Laptop Purchase Test

    @MJA
    Scenario Outline: To verify that the user is purchase laptop products successfully
        Given I am on Demoblaze Home page
        Then navigate to Laptop section
        Then Add "<products>" to cart
        Then I navigate to cart
        And Delete "<cart item>" from cart
        Examples:
            | products | cart item |
            | p1,p2    | xyz       |

