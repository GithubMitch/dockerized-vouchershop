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
  }
</script>