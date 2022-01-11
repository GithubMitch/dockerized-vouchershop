<template>
  <slot name="foldIcon"></slot>
  <slot/>
</template>

<script lang="ts">
  export default {
    layout: 'fold'
  }
</script>