/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'pt'
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/accounts/login',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
