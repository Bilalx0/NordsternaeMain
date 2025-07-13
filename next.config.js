/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/nordsy-9530c.appspot.com/o/**',
      },
    ],
  },
  reactStrictMode: false,
}

//https://firebasestorage.googleapis.com/v0/b/nordsy-9530c.appspot.com/o/apartmentdefaultimages%2Fapartment_placeholder_1.jpeg?alt=media&token=efebdd69-7335-4c94-8f36-0c2fb80a1f0f

module.exports = nextConfig

