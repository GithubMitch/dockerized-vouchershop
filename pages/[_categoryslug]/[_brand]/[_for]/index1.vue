<template>
    <main>
      <!-- <ClientOnly> -->
      <Products :selectedBrand="selectedBrand" /> 
      <!-- </ClientOnly> -->
      <!-- <NuxtChild keep-alive/> -->
      <VoucherShop keep-alive/>
    </main>
</template>

<script lang="ts">
  import { state, actions } from '../../../../store/reactives';
  import {
    defineComponent,
    toRef,
  } from 'vue';

  export default defineComponent({
    async setup(props) {
      const selectedBrand = toRef(state, 'selectedBrand');
      // console.log('selectedBrand',selectedBrand.value)
      return{selectedBrand};
    }
  })
</script>