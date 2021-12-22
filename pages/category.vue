<template>
    <main>
      <HeaderComp />
        <!-- /category -->
      <NuxtChild/>
      <!-- <VoucherShop keep-alive/> -->
      <FooterComp/>
    </main>

</template>

<script lang="ts">
import { defineComponent, onMounted, toRaw , ref, toRef, watch} from 'vue'

export default defineComponent({
  setup() {
    // const router = useRouter();
    // const route = useRoute();

    // let str = route.path.substring(route.path.indexOf('/'));
    // let categoryTitle = str.split('/')
    // // .replace(/^\/+/, '');
    // console.log(categoryTitle[2])
    // // console.log(route.path)
    // // console.log(categoryTitle)
    // let title = route.path.split('/')

    return {}
  }
})


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

</style>
