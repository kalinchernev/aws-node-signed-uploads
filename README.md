# AWS Node Signed Uploads

Use this approach when you want or have to use [Amazon API Gateway](https://aws.amazon.com/api-gateway/) and you want to solve the 10MB payload limit.

The service is based on the [serverless](https://serverless.com/) framework and solves a simple problem - uploading objects to a specific S3 bucket using [pre-signed URL](http://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html)s. Implemented in node.js runtime using [getSignedUrl](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property) method.

## Security

Although unit tests are showing a full test coverage, the actual integration with the deployed service will not work as the unit tests assert, because the API part.

```yaml
functions:
  upsert-objects:
    ...
    events:
      - http:
          path: upload
          method: put
          private: true
          cors: true
```

The `private` flag is there to [secure the endpoint](https://github.com/dherault/serverless-offline#aws-api-gateway-features).

To use the deployed service in real life, you'll have to [set a `x-api-key` header](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-use-postman-to-call-api.html), which is generated after creating a [usage plan for the API](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html).

## Integrations

Here's a short list of possible integrations I found making a quick Google search:

- [Using pre-signed URLs to upload a file to a private S3 bucket](https://sanderknape.com/2017/08/using-pre-signed-urls-upload-file-private-s3-bucket/)
- [react-s3-uploader](https://www.npmjs.com/package/react-s3-uploader)

## How to use

Get dependencies with `yarn` or `npm install`. The following examples will assume the usage of `yarn`.

### Tests

Running all tests:

```bash
$ yarn test
```

Developing tests:

```bash
$ ./node_modules/.bin/jest --watch
```

### Develop locally

Starting a local dev server and its endpoint for receiving uploads:

```bash
$ yarn start
```

### Linter

Starting the linter tasks:

```bash
$ yarn lint
```

### Deployment

[Setup your AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

Run the following the fire the deployment:

```bash
$ yarn deploy
```

Don't forget to go the to AWS Console for API Gateway and configure usage plans and API keys.

## Known tricky parts

The S3 method is a callback style in a project with promises because [S3 Get Signed URL accepts callback but not promise](https://github.com/aws/aws-sdk-js/issues/1008).
