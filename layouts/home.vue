<template>
  <main>
    <slot name="slider"></slot>
    <slot name="pickcategory"></slot>
    <slot name="salesprops"></slot>
    <slot name="content"></slot>
  </main>
</template>

<script lang="ts">
  import {state} from '../store/reactives'
  export default defineComponent({
    layout: `home`,
    head() {
      return {
        title: 'VoucherShop Home',
        link: [
          {
            rel: "stylesheet",
            href: "/assets/iconfont/iconfont.css"
          }
        ],
        meta: [
          {
            // hid: 'ABOUT-HID',
            // name: `About page`,
            // content: 'Website about page'
          }
        ]
      }
    },
    async setup () {
      const setupAppReady = toRef(state, 'setupAppReady')
      return {setupAppReady}
    }
  })
</script>
