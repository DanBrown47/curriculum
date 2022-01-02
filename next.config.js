const path = require("path");

module.exports = {
  productionBrowserSourceMaps: process.env.GENERATE_SOURCEMAP,
  images: {
    domains: ["nullcast-assets.s3.amazonaws.com"]
  },
  webpack5: true,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };
    return config;
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    ENV: process.env.ENV,
    EDITOR_URL: process.env.EDITOR_URL,
    BUCKET_URL: process.env.BUCKET_URL,
    SERVER_URL: process.env.SERVER_URL
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate"
          }
        ]
      }
    ];
  }
};
