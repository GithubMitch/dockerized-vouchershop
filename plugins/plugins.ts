import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  console.log('Currency')
  return {
    provide: {
      currency: (value) => '€ ' + value/100
    }
  }
})

