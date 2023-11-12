import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {AWS_BUCKET_NAME,AWS_BUCKET_REGION,AWS_PUBLIC_KEY,AWS_SECRECT_KEY} from './config.js';
import fs from 'fs';

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRECT_KEY
    }
});

export async function uploadFile(file){
    const stream = fs.createReadStream(file);
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: 'Hola.png',
        Body: stream
    };
    const command = new PutObjectCommand(uploadParams);
    const result = await client.sent(command);
    console.log(result);
}