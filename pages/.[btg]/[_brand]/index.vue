<template>
  <Products 
  :products="stockProducts ? stockProducts : selectedBrandProducts" 
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
      const selectedBrand = toRef(state, 'selectedBrand');
      const stockProducts = toRef(state, 'stockProducts');

      return{stockProducts};
    }
  })
</script>