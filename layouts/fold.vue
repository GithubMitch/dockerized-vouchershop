<template>
  <div>
    <slot name="foldIcon"></slot>
    <slot/>
  </div>
</template>

<script lang="ts">
  export default {
    layout: 'fold'
  }
</script>