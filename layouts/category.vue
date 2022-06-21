<template>
  <main class="inner">
    <slot name="back"><BackButton/></slot>
    <slot name="title"></slot>
    <slot name="content"></slot>
    <slot/>
  </main>
</template>

<script lang="ts">
import BackButton from "~~/components/backButton.vue"

  export default {
    layout: `category`,
    head() {
        return {
            title: "VoucherShop Home",
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
        };
    },
    components: { BackButton }
}
</script>

<style scoped>
  .inner {
    margin:auto;
    max-width:1640px;
    padding:1em;
    position: relative;
  }
</style>