import SSH2Promise = require('ssh2-promise');
import { logger } from 'custom-libraries/utils/logger.helper';
import { browser } from 'protractor';
require('env-params').env(browser.params.environment, 'environment/');

var path = require('path');

class SFTPHelper {
  public sshconfig = {
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USER,
    password: process.env.SFTP_PASSWORD,
  };
  public downloadDirectory = `${process.cwd()}\\${
    process.env.TEST_REPORT_DIRECTORY
  }`;

  /**
   * This method helps to validate the presence of report
   * file availability in relativity pre-review folder
   * @param filename
   * @example
   */
  async isFileExistInPreReview(filename: string) {
    let bReturn: boolean = false;

    try {
      let fileName = filename;

      var remotePathToList = '/data/javed_pre_review_archive';
      var ssh = new SSH2Promise(this.sshconfig);
      await ssh.connect();
      logger.info('Connection established');

      var sftp = ssh.sftp();

      //Directory Listing
      let lstDir = await sftp.readdir(remotePathToList);

      //File open
      // await sftp.open(
      //   '/data/ccpa_pre_review_archive/' + fileName + '.pdf',
      //   'r'
      // );

      //File encoding
      // let fcont: string;
      let fcont = await sftp.readFile(
        '/data/javed_pre_review_archive/' + fileName + '.pdf',
        'UTF-8'
      );

      //compare file content
      // let fcont2 = await sftp.readFile('/data/ccpa_pre_review_archive/2C58D73HPA.pdf','UTF-8');
      // expect(fcont).toBe(fcont2);

      //Download the File from sftp
      await sftp.fastGet(
        '/data/javed_pre_review_archive/' + fileName + '.pdf',
        path.join(this.downloadDirectory, '/downloads/' + fileName + '.pdf')
      );

      if (fcont === null) {
        bReturn = false;
      } else {
        bReturn = true;
      }
    } catch (error) {
      bReturn = false;
    }
  }

  async getSFTPFilename(strOTID: string, strRITM: string) {
    let otId = strOTID;
    let snowID = strRITM;
    const __filename = otId + '_' + snowID;
    return __filename;
  }
}

export const sftpHelper: SFTPHelper = new SFTPHelper();
