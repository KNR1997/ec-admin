/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

// const runtimeCaching = require('next-pwa/cache');
// const withPWA = require('next-pwa')({
//   disable: process.env.NODE_ENV === 'development',
//   dest: 'public',
//   runtimeCaching,
// });

console.log('BUILD ENV:', {
  DEFAULT_LANGUAGE: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
  AVAILABLE_LANGUAGES: process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES,
});

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      'via.placeholder.com',
      'res.cloudinary.com',
      's3.amazonaws.com',
      '18.141.64.26',
      '127.0.0.1',
      'localhost',
      'picsum.photos',
      'pickbazar-sail.test',
      'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com',
      'lh3.googleusercontent.com',
      '127.0.0.1:8000',
    ],
  },
  ...(process.env.APPLICATION_MODE === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};

module.exports = nextConfig;
