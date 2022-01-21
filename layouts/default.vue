<template>
  <slot name="content"></slot>
</template>

<script lang="ts">

  export default {
    layout: `default`,
    head() {
      // console.log(this.$content.article)
      // let title = this.getTitle();
      return {
        title: 'default',
        link: [
          {
            rel: "stylesheet",
            href: "/assets/iconfont/iconfont.css"
          }
        ],
        meta: [
          {
            hid: 'ABOUT-HID',
            name: `About page`,
            content: 'Website about page'
          }
        ]
      }
    },
  }
// export default {
//   setup () {
//     useMeta({
//       title: 'Home',
//       meta: [
//         { name: 'Home', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
//       ]
//     })
//   }
// }
</script>