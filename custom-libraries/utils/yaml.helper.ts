/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import * as yaml from 'js-yaml';
import path from 'path';

class YamlHelper {
  async getData(
    nodeName: string,
    fieldName: string,
    testCaseId: string,
    fileName: string
  ) {
    const datafile = path.join(__dirname, '../../testData', fileName);
    let testcaseToExecute: string;
    try {
      const document = await yaml.safeLoad(fs.readFileSync(datafile, 'utf8'));
      document[nodeName].forEach((element) => {
        if (element[Object.keys(element)[0].trim()] == testCaseId.trim()) {
          testcaseToExecute = element[fieldName];
        }
      });
    } catch (error) {
      return error;
    }
    return testcaseToExecute;
  }
}

export const yamlHelper: YamlHelper = new YamlHelper();
