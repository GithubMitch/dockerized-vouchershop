<template>
  <main>
    <slot name="slider"></slot>
    <slot name="salesprops"></slot>
    <slot name="content"></slot>
    <slot name="vouchershopcomponent"></slot> 
  </main>
</template>

<script lang="ts">

  export default {
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
  }
</script>