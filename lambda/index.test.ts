import { APIGatewayProxyEventV2 } from "aws-lambda";
import { Strava } from "strava";
import { handler } from './index';

jest.mock('strava');

describe('Lambda', () => {
  it('returns "Error" when body is empty', async () => {
    const event: APIGatewayProxyEventV2 = {
      "version": "2.0",
      "routeKey": "$default",
      "rawPath": "/",
      "rawQueryString": "",
      "headers": {},
      "requestContext": {
        "accountId": "253136705224",
        "apiId": "qsqlrdoaa4",
        "domainName": "qsqlrdoaa4.execute-api.eu-central-1.amazonaws.com",
        "domainPrefix": "qsqlrdoaa4",
        "http": {
          "method": "POST",
          "path": "/",
          "protocol": "HTTP/1.1",
          "sourceIp": "IP",
          "userAgent": "agent"
        },
        "requestId": "id",
        "routeKey": "$default",
        "stage": "$default",
        "time": "12/Mar/2020:19:03:58 +0000",
        "timeEpoch": 1583348638390
      },
      "body": "",
      "isBase64Encoded": false,
    };
    const response = await handler(event);

    expect(response).toEqual('Error');
  })

  it('returns "Error" when body is not valid', async () => {
    // @ts-ignore
    const StravaMock = Strava.mock.instances[0];
    // @ts-ignore
    console.log(StravaMock.athlete);
    StravaMock.athlete.updateLoggedInAthlete.mockRejectedValue();

    const event: APIGatewayProxyEventV2 = {
      "version": "2.0",
      "routeKey": "$default",
      "rawPath": "/",
      "rawQueryString": "",
      "headers": {},
      "requestContext": {
        "accountId": "253136705224",
        "apiId": "qsqlrdoaa4",
        "domainName": "qsqlrdoaa4.execute-api.eu-central-1.amazonaws.com",
        "domainPrefix": "qsqlrdoaa4",
        "http": {
          "method": "POST",
          "path": "/",
          "protocol": "HTTP/1.1",
          "sourceIp": "IP",
          "userAgent": "agent"
        },
        "requestId": "id",
        "routeKey": "$default",
        "stage": "$default",
        "time": "12/Mar/2020:19:03:58 +0000",
        "timeEpoch": 1583348638390
      },
      "body": "{\"size\": 10}",
      "isBase64Encoded": false,
    };
    const response = await handler(event);

    expect(response).toEqual('Error');
  })
});