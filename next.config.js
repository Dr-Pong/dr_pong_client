/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

const nextTranslate = require('next-translate-plugin');

module.exports = {
  ...nextConfig,
  ...nextTranslate(),
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};
