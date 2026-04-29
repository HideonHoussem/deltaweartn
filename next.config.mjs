/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out for local testing of API routes
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['10.0.2.2'],
}

export default nextConfig
