import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'atomicdesign.bradfrost.com',
        port: '',
        search: '',
      },
    ],
  }
};

export default nextConfig;
