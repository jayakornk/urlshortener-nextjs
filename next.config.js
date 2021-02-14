/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['@geist-ui/react']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withTM(
  withBundleAnalyzer({
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
      domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    },
    async rewrites() {
      return [
        {
          source: '/r/:path*',
          destination: '/api/r/:path*',
        },
      ];
    },
  })
);
