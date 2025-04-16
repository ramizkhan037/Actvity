import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: [
    '9005-idx-studio-1744727731815.cluster-jbb3mjctu5cbgsi6hwq6u4btwe.cloudworkstations.dev',
  ],
};

export default nextConfig;
