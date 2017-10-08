import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies

export const handler = (event, context, callback) => {
  const bucket = process.env.BUCKET;
  const region = process.env.REGION;

  if (!bucket || !region) {
    callback(`BUCKET and REGION are required environment variables`);
  }

  const S3 = new AWS.S3({ signatureVersion: 'v4', region });

  const file =
    event.headers && event.headers['x-amz-meta-key']
      ? event.headers['x-amz-meta-key']
      : undefined;

  if (!file) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        message: `Missing x-amz-meta-key header`,
      }),
    };

    callback(null, response);
  }

  // If producer has correctly submitted a key.
  const params = {
    Bucket: bucket,
    Key: file,
    Expires: 30,
  };

  S3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      callback(err);
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(url),
    };

    callback(null, response);
  });
};

export default handler;
