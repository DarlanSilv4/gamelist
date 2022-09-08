/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.igdb.com', 'lh3.googleusercontent.com']
  },

  //Material icons font does not work in production when optimize fonts option is enabled
  optimizeFonts: false,
}

module.exports = nextConfig
