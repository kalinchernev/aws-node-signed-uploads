# AWS Node Signed Uploads

[![codecov](https://codecov.io/gh/kalinchernev/aws-node-signed-uploads/branch/master/graph/badge.svg)](https://codecov.io/gh/kalinchernev/aws-node-signed-uploads)
[![Build Status](https://travis-ci.org/kalinchernev/aws-node-signed-uploads.svg?branch=master)](https://travis-ci.org/kalinchernev/aws-node-signed-uploads)

## Requirements

* Node.js >= 6.9.1
* npm >= 3.10.8

## Welcome

If you have landed to this project out of curiosity for the technologies behind the service, you can see implementation details in [this article](https://kalinchernev.github.io/tdd-serverless-jest).

The approach implemented in this service is useful when you want to use [Amazon API Gateway](https://aws.amazon.com/api-gateway/) and you want to solve the 10MB payload limit.

The service is based on the [serverless](https://serverless.com/) framework. The service is uploading objects to a specific S3 bucket using a [pre-signed URL](http://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html). Implemented in node.js runtime using [getSignedUrl](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property) method.

The package is targeting the latest runtime of AWS Lambda. ([8.10](https://aws.amazon.com/blogs/compute/node-js-8-10-runtime-now-available-in-aws-lambda/))

### Prerequisites

1.  Create `config.json`

Example is provided in `config.example.json`.

2.  Create a bucket for the file uploads

The name of the folder should be matching `bananabucket-${self:provider.stage}`, where `${self:provider.stage}` is dynamically calculated based on the settings of `config.json`.

Of course you can also change the name of environment variable completely from `BUCKET: bananabucket-${self:provider.stage}`, but where's the fun of not having a `bananabucket`?

### File name to sign

The file you want to upload is signed via `x-amz-meta-filekey` header.

### Integrations

Here's a short list of possible integrations I found making a quick Google search:

* [Using pre-signed URLs to upload a file to a private S3 bucket](https://sanderknape.com/2017/08/using-pre-signed-urls-upload-file-private-s3-bucket/)
* [react-s3-uploader](https://www.npmjs.com/package/react-s3-uploader)

### How to use

Get dependencies with `yarn` or `npm install`. The following examples will assume the usage of `yarn`.

### Tests

Running all tests:

```bash
$ yarn test
```

Developing tests:

```bash
$ npx jest --watch
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
