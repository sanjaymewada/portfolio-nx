import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  }, // ← yaha comma chahiye tha

  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(nextConfig)
