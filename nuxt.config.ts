import { defineNuxtConfig } from 'nuxt3'
export default defineNuxtConfig({  
  publicRuntimeConfig: {
    hand_base_url: process.env.NODE_ENV === 'production' ? 'http://vouchershop.nl' : 'http://hndxs.test.hand.local:8280/hndxs/v1/online/',
    hand_auth_user: process.env.BASIC_AUTH_USR,
  },
  privateRuntimeConfig: {
    hand_auth_pw: process.env.BASIC_AUTH_PW,
    hand_auth_key: process.env.BASIC_AUTH_KEY
  }
})