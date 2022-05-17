<template>
  <h1>brand page</h1>
  <Products 
  :products="stockProducts ?? stockProducts" 
  /> 
  <!-- :products="products" -->
</template>

<script lang="ts">
  import { state, actions } from '../../../store/reactives';
  import {
    defineComponent,
    toRef
  } from 'vue';
  // import gsap from "gsap";
  

  export default defineComponent({
    layout: 'productlist',
    // props: {
    //   selectedBrand:{
    //     type: String,
    //     default: ''
    //   },
    //   products:{
    //     type: Object,
    //     default: {}
    //   }
    // },
    async setup(props) {     
      const stockProducts = toRef(state, 'stockProducts');

      return{stockProducts};
    }
  })
</script>