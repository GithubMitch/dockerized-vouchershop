<template>
  <ClientOnly>
    <Products :selectedBrand="selectedBrand" /> 

  </ClientOnly>

  <VoucherShop keep-alive/>
</template>

<script lang="ts">
  import { state, actions } from '../../../store/reactives';
  import {
    defineComponent,
    toRef,
  } from 'vue';

  export default defineComponent({
    props: {
      selectedBrand:{
        type: String,
        default: ''
      }
    },
    async setup(props) {
      const selectedBrand = toRef(state, 'selectedBrand');
      console.log(props.selectedBrand)
      return{selectedBrand};
    }
  })
</script>