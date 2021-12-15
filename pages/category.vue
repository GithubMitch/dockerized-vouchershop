<template>
    <main>
      <HeaderComp/>
        category
      <NuxtChild/>

      <FooterComp/>
    </main>

</template>

<script setup>
</script>

<script lang="ts">


export default {
  name: 'home',    
}
</script>



<style>
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

</style>
