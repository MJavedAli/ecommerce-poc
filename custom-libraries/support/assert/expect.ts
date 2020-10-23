/**
 * This file helps to configure Assertion handles for automated tests.
 * Different plugin is used to enhance the capability of chai.
 * chai-smoothie provides a set of custom Chai assertions to help your Protractor-based Serenity/JS tests express their intent better.
 * Chai as Promised extends Chai with a fluent language for asserting facts about promises.
 * chai-string extends the capability of chai to help with common string comparison assertions.
 *
 * Read more about :
 * chai-smoothie: https://www.chaijs.com/plugins/chai-smoothie/
 * chai as promised: https://www.chaijs.com/plugins/chai-as-promised/
 * chai-string: https://www.chaijs.com/plugins/chai-string/
 * chai-Arrays: https://www.chaijs.com/plugins/chai-arrays/
 * chai-Files: https://www.chaijs.com/plugins/chai-files/
 */
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiString from 'chai-string';
import chaiFiles = require('chai-files');
import chaiSmoothie = require('chai-smoothie');
import chaiArrays = require('chai-arrays');

chai.use(chaiAsPromised);
chai.use(chaiSmoothie);
chai.use(chaiString);
chai.use(chaiArrays);
chai.use(chaiFiles);

export const expect = chai.expect;
