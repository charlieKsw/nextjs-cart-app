/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/product",
        destination: "https://orderfoodonline.deno.dev/api/product",
      },
      {
        source: "/api/order",
        destination: "https://orderfoodonline.deno.dev/api/order",
      },
    ];
  },
  trailingSlash: true,
  output: "export",
  experimental: {
    esmExternals: false,
  },
  env: {
    API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
};

export default nextConfig;
