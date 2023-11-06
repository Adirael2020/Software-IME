import { S3Client } from '@aws-sdk/client-s3';
import {AWS_BUCKET_NAME,AWS_BUCKET_REGION,AWS_PUBLIC_KEY,AWS_SECRECT_KEY} from './config.js';

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRECT_KEY
    }
});

function uploadFile(file){
    
}