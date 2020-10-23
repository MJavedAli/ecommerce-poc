/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

//import { decrypted } from './password.handler';
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fName = '../target/';
const globalRoot = path.resolve(__dirname, './target', fName);
console.log('globalRoot: ' + globalRoot);

// const fs = require('fs');
console.log('jsonReportFile: ' + globalRoot + '\\' + 'cucumber_report.json');
const rawdata = fs.readFileSync(globalRoot + '\\' + 'cucumber_report.json');
const reportJsonData = JSON.parse(rawdata);
console.log('reportJsonData: ' + reportJsonData);

const dt = reportJsonData;
console.log('dt2: ' + dt);
const uri = 'test url';
const axiosConfig = {
  headers: {
    Authorization: 'Basic dm41MGljODpXZWxjb21lQDY=',
    'Content-Type': 'application/json',
  },
};
try {
  const returnValue = axios.post(uri, JSON.stringify(dt), axiosConfig);
  console.log('Request result', returnValue.data);
  return returnValue.data;
} catch (error) {
  console.error(`Request error: ${error.message}`);
  return null;
}
