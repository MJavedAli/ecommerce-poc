import { Given, Then, When } from 'cucumber';
import { homeFunctions } from 'e2e/model/stepFunctions';
import { CountryList } from 'testData/enums';
import { projectFunctions } from 'e2e/model/stepFunctions/projects.functions';

Given(/^I am on Demoblaze Home page$/, async () => {
   console.log("step 1");
});
When(/^navigate to Laptop section$/, async () => {
  console.log("step 2");

});
Then(/^Add "(.*?)" to cart$/, async (product: string) => {
console.log(product);
});
Then(/^I navigate to cart$/, async () => {
  console.log("step 4");
});

Then(/^Delete "(.*?)" from cart$/, async (dele:string) => {
  console.log(dele);
});

