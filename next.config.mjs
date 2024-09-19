/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "us-west-2.graphassets.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
