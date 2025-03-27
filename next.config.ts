import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "shared-memories.s3.us-west-1.amazonaws.com",
      },
      {
        hostname: "shared-memories.s3.us-east-1.amazonaws.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "shared-memories-uploads.s3.us-east-1.amazonaws.com",
      },
      {
        hostname: "user-uploads.r2.cloudflarestorage.com",
      },
      {
        hostname: "r2-worker.tshemm.workers.dev",
      },
    ],
  },
};

export default nextConfig;
