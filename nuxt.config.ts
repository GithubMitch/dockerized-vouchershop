import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt3'
import { createCommonJS } from 'mlly'
const { __dirname } = createCommonJS(import.meta.url)


// const isBrandswitch(expression) {
//   case x:
//     // code block
//     break;
//   case y:
//     // code block
//     break;
//   default:
//     // code block
// }

// const logTest = () => {
//   let log = console.log('hi')
//   return log
// }

export default defineNuxtConfig({
  // router: {
  //   routes: 
  //     [{
  //       path: "/:category/:brand",
  //       name: "category-brand",
  //       file: resolve(__dirname, '/pages/[category]/[brand].vue'),
  //       beforeEnter: [logTest],
  //       children: [
  //         {
  //           name: "category-brand",
  //           path: "beltegoed/bellen",
  //           file: resolve(__dirname, '/pages/[category]/[brand]/index.vue'),
  //           children: [],
  //           component: resolve(__dirname, '/pages/[category]/[brand]/index.vue')
  //         }
  //       ],
  //       component: resolve(__dirname, '/pages/[category]/[brand].vue'),
  //     }]
  // },
  // router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       name: "category-brand",
  //       // path: "/:category/:brand",
  //       component: resolve(__dirname, '/pages/[category]/[_brand].vue'),
  //       beforeEnter: [console.log('hi')]
  //     })
  //   }
  // },
  // router: {
  //   middleware: ['test'],
  //   extendRoutes(routes) {
  //     routes.push(
  //       // {
  //       //   name: "category-brand",
  //       //   // path: "/:category/:brand",
  //       //   component: resolve(__dirname, '/pages/[category]/[_brand].vue'),
  //       //   beforeEnter: [console.log('hi')]
  //       // },
  //       {
  //         path: "/:category/:brand",
  //         name: "category-brand",
  //         file: resolve(__dirname, '/pages/[category]/[brand].vue'),
  //         beforeEnter: [logTest],
  //         children: [
  //           {
  //             name: "category-brand",
  //             path: "beltegoed/bellen",
  //             file: resolve(__dirname, '/pages/[category]/[brand]/index.vue'),
  //             children: [],
  //             component: resolve(__dirname, '/pages/[category]/[brand]/index.vue')
  //           }
  //         ],
  //         component: resolve(__dirname, '/pages/[category]/[brand].vue'),
  //       },
  //     )
  //   }
  // },

  // hooks: {
  //   'pages:extend' (pages) {
  //     pages.push(
  //       {
  //         "name": "index",
  //         "path": "/",
  //         "children": [],
  //         "file": resolve(__dirname, 'pages/test.vue')
  //       },
  //       {
  //         path: "/:category/:group",
  //         file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //         children: [
  //           {
  //             name: "group-bellen",
  //             path: "/:category/bellen",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-bundels",
  //             path: "/:category/bundels",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-data",
  //             path: "/:category/data",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-bundels",
  //             path: "/:category/bundels",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-console",
  //             path: "/:category/console",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-pc",
  //             path: "/:category/pc",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-paysafe",
  //             path: "/:category/paysafe",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-appleitunes",
  //             path: "/:category/appleitunes",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-googleplay",
  //             path: "/:category/googleplay",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-tonys",
  //             path: "/:category/tonys",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-eropuit",
  //             path: "/:category/eropuit",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },
  //           {
  //             name: "group-homevoordeel",
  //             path: "/:category/homevoordeel",
  //             "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //           },            
  //         ]
  //       },
  //       // {
  //       //   path: "/:category/:brand",
  //       //   file: resolve(__dirname, '/pages/[category]/[brand].vue'),
  //       //   children: [
  //       //     {
  //       //       name: "brand-kpn",
  //       //       path: "/:category/kpn",
  //       //       "file": resolve(__dirname, '/pages/[category]/[brand]/index.vue')
  //       //     },
  //       //     {
  //       //       name: "brand-voda",
  //       //       path: "/:category/voda",
  //       //       "file": resolve(__dirname, '/pages/[category]/[brand]/index.vue')
  //       //     }
  //       //   ]
  //       // },        
  //   //     {
  //   //       path: "/:category/data",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-data",
  //   //           path: "/:category/data",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: "/:category/bundels",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-bundels",
  //   //           path: "/:category/bundels",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: "/:category/console",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-console",
  //   //           path: "/:category/console",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: "/:category/pc",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-pc",
  //   //           path: "/:category/pc",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: "/:category/paysafe",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-paysafe",
  //   //           path: "/:category/paysafe",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: "/:category/appleitunes",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-appleitunes",
  //   //           path: "/:category/appleitunes",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: "/:category/googleplay",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-googleplay",
  //   //           path: "/:category/googleplay",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: "/:category/tonys",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-tonys",
  //   //           path: "/:category/tonys",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: "/:category/eropuit",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-eropuit",
  //   //           path: "/:category/eropuit",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: "/:category/homevoordeel",
  //   //       file: resolve(__dirname, '/pages/[category]/[group].vue'),
  //   //       children: [
  //   //         {
  //   //           name: "group-homevoordeel",
  //   //           path: "/:category/homevoordeel",
  //   //           "file": resolve(__dirname, '/pages/[category]/[group]/index.vue')
  //   //         },
  //   //       ]
  //   //     },

  //     )
  //   }
  // },
  //TODO FINISH ROUTES
  publicRuntimeConfig: {
    hand_base_url: process.env.NODE_ENV === 'production' ? 'http://vouchershop.nl' : 'http://hndxs.test.hand.local:8280/hndxs/v1/online/',
    hand_auth_user: process.env.BASIC_AUTH_USR,
  },
  privateRuntimeConfig: {
    hand_auth_pw: process.env.BASIC_AUTH_PW,
    hand_auth_key: process.env.BASIC_AUTH_KEY
  },
  
})