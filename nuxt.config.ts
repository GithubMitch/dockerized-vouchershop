import { defineNuxtConfig } from 'nuxt3'
import { join } from 'path'


// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // modules: [
  //   '~/modules/addRoutes'
  // ],
  router: {
    extendRoutes(routes, join) { 
  //     routes.push({
  //       name: 'home', 
  //       path: '/homepage', 
  //       component: join(__dirname, "/pages/Home.vue"),
  //     })
      console.log(routes)
  //     // routes.push({
  //     //   name: "vouchershop", 
  //     //   path: "/vouchershop/", 
  //     //   component: resolve(__dirname, "vouchershop.vue"),
  //     //   alias: "shop" 
  //     // })      
    }
  }
})
