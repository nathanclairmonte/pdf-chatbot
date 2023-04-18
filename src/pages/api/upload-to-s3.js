import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export default async function handler(req, res) {
    console.log("uploading to s3...");
    const s3Client = new S3Client({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        signatureVersion: "v4",
    });

    const post = await createPresignedPost(s3Client, {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: req.query.fileName,
        Fields: {
            // acl: "public-read", // (causes problems with AWS S3)
            "Content-Type": req.query.fileType,
        },
        Expires: 600, // seconds
        Conditions: [{ bucket: process.env.S3_BUCKET_NAME }],
    });

    res.status(200).json(post);
}
