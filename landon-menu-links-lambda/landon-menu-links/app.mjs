/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
// import { AWS } from 'aws-sdk';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AWS = require('aws-sdk');

AWS.config.update({
  region: "eu-west-2"
});

const dynamodb = new AWS.DynamoDB.DocumentClient({
  endpoint: process.env.AWS_SAM_LOCAL ? 'http://dynamodb-local:8000' : undefined,
});


export const lambdaHandler = async (event, context) => {
  const params = {
    TableName: 'MenuLinks',
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // <-- CORS header
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
      body: JSON.stringify(data.Items),
    };

  } catch (err) {
    console.error('DynamoDB Scan Error:', err);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // <-- CORS header
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
      body: JSON.stringify({ error: 'Could not fetch data' }),
    };
  }
};
