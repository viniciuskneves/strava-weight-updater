#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { StravaWeightUpdaterStack } from '../lib/strava-weight-updater-stack';

const app = new cdk.App();

if (
  !process.env.CLIENT_ID ||
  !process.env.CLIENT_SECRET ||
  !process.env.REFRESH_TOKEN
) {
  throw new Error('Environment variables missing');
}

new StravaWeightUpdaterStack(app, 'StravaWeightUpdaterStack');
