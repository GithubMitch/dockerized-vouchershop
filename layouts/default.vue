<template>
  <main>
    <slot name="content"></slot>
  </main>
</template>

<script lang="ts">

  export default {
    layout: `default`,
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