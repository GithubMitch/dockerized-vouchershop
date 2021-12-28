<template>
  <!-- <ClientOnly> -->
    <NuxtChild 
    :selectedBrand="selectedBrand" 
    :products="stockProducts" 
    keep-alive/>

  <!-- </ClientOnly> -->
</template>

<script lang="ts">
  import { state, actions } from '../../store/reactives';
  import {
    defineComponent,
    toRef,
    onMounted,
  } from 'vue';

  export default defineComponent({
    async setup(props) {
      const route = useRoute()
      const selectedBrand = toRef(state, 'selectedBrand');
      const stockProducts = toRef(state, 'stockProducts');

    
      onMounted(() => {
        /* do something before Vue calls this component's render function */
        selectedBrand.value == '' ? actions.setSelectedBrand(route.params._brand) : console.log('Selected brand value :', selectedBrand.value);
        console.log(selectedBrand.value)
        // stockProducts.value == '' ? actions.setSelectedBrand(route.params._brandslug) : console.log('Selected brand value :', selectedBrand.value);        
      }) 
      
      

      return{selectedBrand, stockProducts};
    }
  })
</script>