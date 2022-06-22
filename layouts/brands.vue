<template>
  <main class="main">
    <slot name="content"></slot>
    <slot/>
  </main>
</template>

<script lang="ts">

  export default {
    layout: `brands`,
  }
</script>