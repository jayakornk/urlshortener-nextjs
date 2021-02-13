module.exports = {
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
};
