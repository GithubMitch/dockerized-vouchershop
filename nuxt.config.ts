import { resolve, join } from 'path'
import { defineNuxtConfig } from 'nuxt3'
import { createCommonJS } from 'mlly'
const { __dirname } = createCommonJS(import.meta.url)

export default defineNuxtConfig({
  // hooks: {
  //   'pages:extend' (pages) {
  //     pages.push({
  //       name: 'brands',
  //       path: '*',
  //       file: resolve('./brand/index.vue')
  //     })
  //   }
  // }
})