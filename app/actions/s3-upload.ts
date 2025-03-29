'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

export async function getPreSignedUrl(
  fileName: string,
  fileType: string,
  userId: string,
  eventId: string,
  galleryId: string
) {
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    },
  });

  const uniqueFileName = `${uuidv4()}.${fileName.split('.').pop()}`;
  const dirInBucket = `uploads/${userId}/${eventId}/${galleryId}`;
  const newFileName = `${dirInBucket}/${uniqueFileName}`;

  const url = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: newFileName,
      ContentType: fileType,
      ACL: 'public-read',
      Metadata: {
        'cors-exposed-headers': 'Access-Control-Allow-Origin',
      },
    }),
    { expiresIn: 3600 }
  );

  // Use the public URL for Cloudflare R2 (should be a custom domain or Cloudflare Workers URL)
  const publicBaseUrl =
    process.env.NEXT_PUBLIC_CLOUDFLARE_PUBLIC_URL ||
    `${process.env.CLOUDFLARE_R2_BUCKET_NAME}.r2.dev`;

  return {
    newFileName,
    url,
    publicUrl: `https://${publicBaseUrl}/${newFileName}`,
  };
}
