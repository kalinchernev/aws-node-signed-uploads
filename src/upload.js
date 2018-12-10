import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies
import checker from './lib/envVarsChecker';

export const handler = async event => {
  const bucket = process.env.BUCKET;
  const region = process.env.REGION;

  const missing = checker(process.env);

  if (missing.length) {
    const vars = missing.join(', ');
    return `Missing required environment variables: ${vars}`;
  }

  const S3 = new AWS.S3({ signatureVersion: 'v4', region });

  const file =
    event.headers && event.headers['x-amz-meta-filekey']
      ? event.headers['x-amz-meta-filekey']
      : undefined;

  if (!file) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        message: `Missing x-amz-meta-filekey in the header of the request.`,
      }),
    };

    return response;
  }

  const params = {
    Bucket: bucket,
    Key: file,
    Expires: 30,
  };

  try {
    const url = await S3.getSignedUrl('putObject', params);

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(url),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify(error),
    };

    return response;
  }
};

export default handler;
