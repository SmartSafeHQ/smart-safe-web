/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'pt'
  },
  async redirects() {
    return [
      {
        source: '/accounts',
        destination: '/',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
