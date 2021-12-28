<template>
    <main>
      <HeaderComp keep-alive/>
      <VoucherShop/>
      <FooterComp keep-alive/>
    </main>

</template>

<script setup>
</script>

<script lang="ts">


export default {
  name: 'home',    
}
</script>



<style lang="scss">

/* RESET STYLE SHEET */
  html {
    background:repeating-linear-gradient(
      -137deg,hsla(0,0%,62%,.050980392156862744),hsla(0,0%,100%,.25098039215686274) 200
      px
      );
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

  /* product.vue */
  .product-list {
    display: flex;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    list-style:none;
    padding:0;
  }
  .product-list li {
    width: 30%;
    border:1px dashed black;
    text-align:center;
    padding:1em;
    background:#fbfbfb;
  }
  .product-list li:hover {
    background:#dedede;
  }
    /* product.vue */
  .brand-list {
    display: flex;
    list-style: none;
    padding: 0;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    justify-content: space-between;
  }
  .brand-list li {
    width: 32%;
    box-sizing: border-box;
    border: 1px dashed black;
    text-align: center;
    padding: 1em;
    background: #fbfbfb;
  }
  .brand-list li:hover {
    background:#dedede;
  }  

</style>
