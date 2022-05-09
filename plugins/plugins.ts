import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      currency: (value) => '€ ' + value/100
    }
  }
})

