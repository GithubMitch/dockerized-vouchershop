import { defineNuxtConfig } from 'nuxt'
// import { createCommonJS } from 'mlly'
// const { __dirname } = createCommonJS(import.meta.url)
    // "nuxt3": "3.0.0-27296423.f3082ca"
    // "@vueuse/core": "^7.7.0",

export default defineNuxtConfig({
  // env: {
  //   baseUrl: process.env.BASE_URL || 'http://localhost'+process.env.PORT,
  // },
  // router: {
  //   trailingSlash: false
  // },
  //TODO FINISH ROUTES
  runtimeConfig: {
    hand_auth_pw: process.env.BASIC_AUTH_PW,
    hand_auth_key: process.env.BASIC_AUTH_KEY,
    hand_auth_user: process.env.BASIC_AUTH_USR,
    public: {
      apiBase: ':/api',
      hand_base_url: process.env.NODE_ENV === 'production' ? 'http://vouchershop.nl/' : 'http://hndxs.test.hand.local:8280/hndxs/v1/online/',
      hand_auth_user: process.env.BASIC_AUTH_USR,
      aws_local_config: {
        //Provide details for local configuration
        accessKeyId: process.env.ACCES_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCES_KEY,
        region: 'eu-central-1',
      },
      aws_remote_config: {
        accessKeyId: process.env.ACCES_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCES_KEY, 
        testDoofus: 'test',
        region: 'eu-central-1',
      },
    },
    // private: {
    //   hand_auth_pw: process.env.BASIC_AUTH_PW,
    //   hand_auth_key: process.env.BASIC_AUTH_KEY
    // },
  },

  
})