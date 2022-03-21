<template>
  <Products 
  :selectedBrand="selectedBrand" 
  /> 
  <!-- :products="products" -->
</template>

<script lang="ts">
  import { state, actions } from '../../../store/reactives';
  import {
    defineComponent,
    toRef,
    onMounted
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
      return{selectedBrand};
    }
  })
</script>