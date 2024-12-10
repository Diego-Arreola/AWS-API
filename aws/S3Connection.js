import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {AWS_REGION, S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN} from './config.js';

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        sessionToken: AWS_SESSION_TOKEN
    }

});

export const uploadFile = async (file) => {
    const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: file.name,
        Body: file.data,
        ContentType: file.mimetype
    });

    try {
        const response = await s3Client.send(command);
        console.log('File uploaded successfully', response);
        return `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
    } catch (error) {
        console.error('Error uploading file', error);
    }
}