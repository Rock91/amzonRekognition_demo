const aws = require('aws-sdk');
const fs = require('fs');

let S3_REGION = 'us-east-1'
let S3_ACCESS_KEY = 'AKIA3L*TNHK'
let S3_SECRET_KEY = 'umgyYFAV*tczA'

let awsConfig = {
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  region: S3_REGION,
};
aws.config.update(awsConfig);
const S3 = new aws.S3();
var rekognition = new aws.Rekognition(awsConfig);

// pull base64 representation of image from file system (or somewhere else)
fs.readFile('./20.jpg', 'base64', (err, data) => {

  // create a new base64 buffer out of the string passed to us by fs.readFile()
  const buffer = Buffer.from(data, 'base64');

  // now that we have things in the right type, send it to rekognition
  rekognition.detectLabels({
    Image: {
      Bytes: buffer
    }
  }).promise()
    .then((res) => {
      let Data = JSON.stringify(res)
      // print out the labels that rekognition sent back
    });
})