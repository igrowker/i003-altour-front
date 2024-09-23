module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
  async onDemandEntries() {
    return {
      maxInactiveAge: 1000 * 60 * 60,
      pagesBufferLength: 2,
    };
  },
};

module.exports = {
  images: {
    domains: ['maps.googleapis.com'],
  },
};