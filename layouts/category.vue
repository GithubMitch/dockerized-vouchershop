<template>
  <main>
    <slot name="content"></slot>
    <slot/>
  </main>
</template>

<script lang="ts">

  export default {
    layout: `category`,
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
  }
</script>