/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/proxy/baidu_pan/:url*',
        destination: 'https://pan.baidu.com/:url*',
      },
      {
        source: '/proxy/baidu_dl/:url/file/:id*',
        // has: [
        //   {
        //     type: 'query',
        //     key: 'url',
        //     value: '(?<url>.*)' // Named capture group to match anything on the value
        //   }
        // ],
        destination: 'http://:url/file/:id*',
      },
    ]
  },
}
// module.exports = nextConfig

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
})
module.exports = withPWA(nextConfig)
