/** @type {import('next').NextConfig} */
module.exports = {
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
      reactStrictMode: true,
      distDir: 'dist',
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      fs: false, // the solution
    };

    return config;
  },
};