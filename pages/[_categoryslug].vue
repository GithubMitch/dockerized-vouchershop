<template>
  <NuxtLayout name="category">
      <template #content>
          <NuxtChild/> 
      </template>
      <!-- <template #vouchershopcomponent>
          <VoucherShop/>
      </template> -->
  </NuxtLayout>
</template>

<script lang="ts">
  export default {
    layout: "category",
    // layout: false
  }
</script>

<style lang="scss">
#voucherShop {
  display:none;
}
  HTML >* , 
  body > * {
    box-sizing: border-box;
    margin:0;
    padding:0;
    font-size:1rem;
    margin-block-start: 0;
    margin-block-end: 0;
    font-family: Avenir,Helvetica,Arial,sans-serif;
  }
  .inner {
    max-width:990px;
    box-sizing:border-box;
    width:100%;
    display:block;
    position:relative;
    margin:0 auto;
    padding:1em;
    &:last-of-type {
      border:none;
    }
  }
  .product{
    text-decoration: line-through;
    pointer-events: none;
  }
  .product.instock {
    text-decoration: none;
    pointer-events: all;
  }

  /* Vouchershop component */
  #config-window {
    box-shadow: inset 0px 0px 10px -4px #000; 
    box-sizing:border-box;
    background:#ebebeb;
    height:800px;
    padding:1em;
    overflow: scroll;
    :deep() .brandLine ,
    .brandLine {
      cursor:pointer;
    }
    :deep() .brandLine:hover {
      text-decoration: underline;
    }
  }

</style>
