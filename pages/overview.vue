<template>
</template>

<script lang="ts">
  export default {
    name: 'overview',    
  }
</script>



<style>
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
    margin:auto;
    background: #dedede;
    padding:1em;
    border-bottom:1px solid black;
  }
  .inner:last-child {
    border:none;
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
  }
  #config-window :deep() .brandLine ,
  .brandLine {
    cursor:pointer;
  }
  #config-window :deep() .brandLine:hover {
    text-decoration: underline;
  }
</style>
