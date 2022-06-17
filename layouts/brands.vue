<template>
  <main class="main">
    <slot name="content"></slot>
    <slot/>
  </main>
</template>

<script lang="ts">

  export default {
    layout: `brands`,
    head() {
      return {
        title: 'VoucherShop Brands',
        link: [
          {
            rel: "stylesheet",
            href: "@/assets/iconfont/iconfont.css"
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
  }
</script>