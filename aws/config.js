import { config } from 'dotenv';

config();

export const AWS_REGION = process.env.AWS_REGION
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
export const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN
export const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN