const testHtml = require('../../../../examples/2');
const AWS = require('aws-sdk');

const sendEmail = ({ SESConfig }) => {
    const params = {
        Destination: {
            ToAddresses: ["vadim.putrov@gmail.com"]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: testHtml
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: 'This is the message body in text format.'
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email from code'
            }
        },
        ReturnPath: process.env.RETURN_PATH,
        Source: process.env.SOURCE
    };

    try {

     return new AWS.SES(SESConfig).sendEmail(params).promise();

    } catch(err){
        console.log('err', err);
    }
};

module.exports = { sendEmail };