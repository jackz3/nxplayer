import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  debug: false,
  providers: [
    {
      id: "Baidu",
      name: "BaiduPan",
      type: "oauth",
      token: {
        url: `https://openapi.baidu.com/oauth/2.0/token?client_id=${process.env.BAIDU_AppKey}&client_secret=${process.env.BAIDU_SecretKey}`,
        params: {
          client_id: process.env.BAIDU_AppKey,
          client_secret: process.env.BAIDU_SecretKey,
        }
        // async request(context) {
        //   // return { tokens }
        // }
      },
      userinfo: {
        url: "https://pan.baidu.com/rest/2.0/xpan/nas?method=uinfo", 
        async request(context) {
          const access_token = context.tokens.access_token
          const url = `${(context.provider.userinfo as any).url}&access_token=${access_token}`
          return fetch(url).then(res => res.json())
        }
      },
      clientId: process.env.BAIDU_AppKey,
      clientSecret: process.env.BAIDU_SecretKey,
      authorization: {
        url: "https://openapi.baidu.com/oauth/2.0/authorize",
        params: {
          scope: 'basic,netdisk',
          device_id: process.env.BAIDU_AppId,
        }
      },
      profile(profile) {
        console.log('profile', profile)
        return {
          id: profile.baidu_name,
          name: profile.baidu_name,
          // email: profile.kakao_account?.email,
          image: profile.avatar_url,
        }
      },
    },
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl)
      return url
    },
    async jwt({ token, account, user }) {
      console.log('jwt', account, user, token)
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at! * 1000
          // username: account.providerAccountId,
        }
      }

      // if (Date.now() < token.accessTokenExpires) {
      //   console.log('Access token valid', token)
        return token
      // }
      // console.log('Access token expired, refreshing ...')
      // return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      console.log('session', session, token);
      if (session.user) {
        session.user.accessToken = token.accessToken as string
        const user = (session.user) as any
        // user.accessToken = (token as any).accessToken
        user.refreshToken = (token as any).refreshToken
      }
      return session
    }
  },
}