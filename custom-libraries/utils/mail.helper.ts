import * as htmlToText from 'html-to-text';
import * as imaps from 'imap-simple';
class MailHelper {
  async getTestMessage(email: string, password: string) {
    const config = {
      imap: {
        user: email,
        password: password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 30000,
        tlsOptions: { servername: 'imap.gmail.com' },
      },
    };
    let otp;
    try {
      await imaps.connect(config).then(function (connection) {
        console.log('Connected');
        return connection.openBox('INBOX').then(function () {
          const presentTime = new Date();
          presentTime.setTime(Date.now());
          const searchCriteria = [
            'UNSEEN',
            ['FROM', 'imjavedali@gmail.com'],
            ['SINCE', presentTime.toISOString()],
            ['SUBJECT', 'Test mail'],
          ];
          const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
          };
          return connection
            .search(searchCriteria, fetchOptions)
            .then(function (messages) {
              console.log(messages.length);
              messages.forEach(function (message) {
                const body = message.parts[0].body;
                const pattern = '<p><b><span>[0-9]{6}'; // write your raw pattern
                const regex = new RegExp(pattern);
                const matched = regex.exec(body);
                otp = htmlToText.fromString(matched.toString());
                if (otp != undefined || otp != null) {
                  return otp;
                }
              });
            });
        });
      });
    } catch (error) {
      console.error(error);
    }
    return otp;
  }
}
export const mailHelper: MailHelper = new MailHelper();
