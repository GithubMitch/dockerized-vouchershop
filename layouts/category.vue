<template>
  <main>
    <!-- <div class="inner"> -->
      <slot name="content"></slot>
      <slot/>
    <!-- </div> -->
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