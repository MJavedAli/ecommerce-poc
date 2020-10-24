import { Given, Then } from "cucumber";
import { apiHelper } from 'e2e/api/api-helper';
import { expect } from 'chai';
import { logger } from 'custom-libraries';
import { globalVariable } from 'testData/global-variable';

Given(/^I request to get "(.*?)" pets and assert$/, async (status: string) => {
    await apiHelper.getPetsByStatus(process.env.API_BASE_URI, status)

});
Given(/^Post a new available pet to the store for "(.*?)" and assert new pet added$/, async (petTypes: string) => {
    await apiHelper.createNewPetJson(petTypes);
});

Then(/^I update the status to "(.*?)" and assert$/, async (status: string) => {
    await apiHelper.updatePetStatus(globalVariable.newAddedPetId, status)

});
Then(/^I delete the added pet and assert$/, async () => {
    await apiHelper.deletePetByID(globalVariable.newAddedPetId);
});
