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
        source: '/proxy/baidu_dl/:url*',
        // has: [
        //   {
        //     type: 'query',
        //     key: 'url',
        //     value: '(?<url>.*)' // Named capture group to match anything on the value
        //   }
        // ],
        destination: 'https://d.pcs.baidu.com/:url*',
      },
    ]
  },
}

module.exports = nextConfig
