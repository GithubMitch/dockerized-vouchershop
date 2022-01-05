<template>
  <NuxtLayout name="productlist">
    <template #content>

      <NuxtChild 
      :selectedBrand="selectedBrand" 
      :products="stockProducts"
      />

    </template>

  </NuxtLayout>
</template>

<script lang="ts">
  import {_} from 'vue-underscore';

  import { state, actions } from '../../store/reactives';
  import {
    defineComponent,
    toRef,
    onMounted,
    watch
  } from 'vue';

  export default defineComponent({
    layout: 'productlist',
    async setup(props) {
      const route = useRoute()
      const selectedBrand = toRef(state, 'selectedBrand');
      const stockProducts = toRef(state, 'stockProducts');
      const selectedBrandProducts = toRef(state, 'selectedBrandProducts');

      const stock = async (stockProducts)  => {
        selectedBrandProducts.value = _(stockProducts.value).filter({brand: selectedBrand.value, inStock: true})
        // console.log('selectedBrand', selectedBrand.value)
        // console.log(selectedBrandProducts.value, stockProducts.value)
      }
      onMounted(() => {
        // console.log('MOUNTED _BRAND')
        stock(stockProducts)
        // selectedBrandProducts.value.length == 0 ? stock(stockProducts) : console.log(selectedBrandProducts.value.length);
      })      
      // watcher  : watch for changed selectedBrand or fetched stockProducts
      watch([stockProducts , selectedBrand], (newValues, prevValues) => {
        console.log(prevValues, newValues)
        stock(stockProducts)
      })

      return{selectedBrand, stockProducts};
    }
  })
</script>