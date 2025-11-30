import { Injectable } from '@nestjs/common';
import * as AWS from "@aws-sdk/client-s3";
import { ACCESSKEY, SECRETKEY } from 'AWSCred';

@Injectable()
export class AwsService {
    private s3 = new AWS.S3Client({
        region: "us-east-1",
        credentials: {
            accessKeyId: ACCESSKEY,
            secretAccessKey: SECRETKEY,
        },
    })

    async uploadFile(file: Express.Multer.File) {
        const key = file.originalname;
        const url = `https://nest-oxxo-proyect.s3.us-east-1.amazonaws.com/${key}`
        const bucket = "nest-oxxo-proyect";
        const command = new AWS.PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket,
        })

        const response = await this.s3.send(command);
        if (response.$metadata.httpStatusCode !== 200) return null;
        return url;
    }
}
