/* eslint-disable @typescript-eslint/no-var-requires */
import { browser } from 'protractor';
const path = require('path');

class ExcelHelper {
  async getData(sheetName: string, fieldName: string, testCaseId: string) {
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(3000);
    const Excel = require('exceljs/dist/es5');
    const workbook = new Excel.Workbook();
    const datafile = path.join(__dirname, '../../testData', 'data.xlsx');
    await workbook.xlsx.readFile(datafile);
    //let sh:Worksheet = workbook.getWorksheet(1);
    const worksheet = workbook.getWorksheet(sheetName);
    for (let i = 1; i <= worksheet.actualRowCount; i++) {
      if (worksheet.getRow(i).getCell(1).value == testCaseId) {
        for (let j = 1; j <= 20; j++) {
          if (worksheet.getRow(1).getCell(j).value == fieldName) {
            const testdata = worksheet.getRow(i).getCell(j).value;
            return testdata;
          }
        }
      }
    }
  }

  async executeTest(sheetName: string) {
    const testcaseToExecuteMap = new Map();
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(3000);
    const Excel = require('exceljs/dist/es5');
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile('TestData/ContactCenter.xlsx');
    //let sh:Worksheet = workbook.getWorksheet(1);
    const worksheet = workbook.getWorksheet(sheetName);
    for (let i = 1; i <= worksheet.actualRowCount; i++) {
      if (worksheet.getRow(i).getCell(3).value == 'Yes') {
        await testcaseToExecuteMap.set(
          worksheet.getRow(i).getCell(1).value,
          'Yes'
        );
      } else {
        continue;
      }
    }
    return testcaseToExecuteMap;
  }
}
export const excelHelper: ExcelHelper = new ExcelHelper();
