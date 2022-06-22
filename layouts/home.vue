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
    async setup () {
      const setupAppReady = toRef(state, 'setupAppReady')
      return {setupAppReady}
    }
  })
</script>
