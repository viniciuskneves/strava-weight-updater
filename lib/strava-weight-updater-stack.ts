import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { HttpApi } from '@aws-cdk/aws-apigatewayv2';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';

export class StravaWeightUpdaterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, 'Lambda', {
      entry: './lambda/index.ts',
      environment: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        REFRESH_TOKEN: process.env.REFRESH_TOKEN,
      }
    });

    const api = new HttpApi(this, 'API', {
      defaultIntegration: new LambdaProxyIntegration({
        handler: lambda,
      }),
    });

    new cdk.CfnOutput(this, 'API URL', {
      value: api.apiEndpoint,
    });
  }
}
