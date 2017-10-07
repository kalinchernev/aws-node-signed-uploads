import { promisify } from 'util';
import lambda from '../src/upload';

const handler = promisify(lambda);

describe(`Service aws-node-singned-uploads`, () => {
  test(`There should be a lambda function`, () => {
    const event = {};
    const context = {};

    const result = handler(event, context);
    expect(result).resolves.toBeTruthy();
  });
});
