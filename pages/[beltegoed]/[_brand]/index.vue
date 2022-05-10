<template>
  <div class="inner">
    <h1>Selected Brand </h1>
    <!-- <Products :products="stockProducts ? stockProducts : selectedBrandProducts" 
    />  -->
    <!-- {{productFilter}}{{selectedBrand}} -->
    <Products :products="filteredProductList ? filteredProductList : stockProducts" :brand="brand" :group="group" :actionLabel="actionLabel" />
  </div>
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
      const filteredProductList = toRef(state, 'filteredProductList');
      const stockProducts = toRef(state, 'stockProducts');
      const brand = toRef(state, 'brand');
      const group = toRef(state, 'group');
      const actionLabel = toRef(state, 'actionLabel');

      return{stockProducts, filteredProductList, group, brand, actionLabel};
    }
  })
</script>