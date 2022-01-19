import { resolve, join } from 'path'
import { defineNuxtConfig } from 'nuxt3'
import VueNextSelect from 'vue-next-select'

// import { createCommonJS } from 'mlly'
// const { __dirname } = createCommonJS(import.meta.url)

export default defineNuxtConfig({
  buildModules: [
    // VueNextSelect
  ]
  // hooks: {
  //   'pages:extend' (pages) {
  //     pages.push({
  //       name: 'brands',
  //       path: '*',
  //       file: resolve('./brand/index.vue')
  //     })
  //   }
  // }
  // hooks: {
  //   'components:dirs'(dirs) {
  //     // Add ./components dir to the list
  //     dirs.push({
  //       path: join(__dirname, 'components'),
  //       // prefix: 'awesome'
  //     })
  //   }
  // }
})