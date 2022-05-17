export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Yeah')
  // if (to.params.brand !== '1') {
  //   return abortNavigation()
  // }
  // return navigateTo('/')
})