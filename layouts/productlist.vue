<template>
  <main>
    <!-- <slot name="back"><BackButton/></slot> -->
    <slot name="title"></slot>
    <slot name="content"></slot>
    <slot/>
  </main> 
</template>

<script lang="ts">

  export default {
    layout: `productlist`,
    head() {
      return {
        title: 'VoucherShop — ProductList',
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