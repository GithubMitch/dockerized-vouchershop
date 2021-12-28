<template>
    <main>
      <NuxtChild 
      :selectedBrand="selectedBrand" 
      :products="stockProducts" 
      keep-alive/>
    </main>
</template>

<script lang="ts">
  import { state, actions } from '../../../store/reactives';
  import {
    defineComponent,
    toRef,
  } from 'vue';

  export default defineComponent({
    async setup(props) {
      const route = useRoute()
      const selectedBrand = toRef(state, 'selectedBrand');
      const stockProducts = toRef(state, 'stockProducts');


      selectedBrand.value == '' ? actions.setSelectedBrand(route.params._brandslug) : console.log('Selected brand value :', selectedBrand.value);
      stockProducts.value == '' ? actions.setSelectedBrand(route.params._brandslug) : console.log('Selected brand value :', selectedBrand.value);
      

      return{selectedBrand, stockProducts};
    }
  })
</script>