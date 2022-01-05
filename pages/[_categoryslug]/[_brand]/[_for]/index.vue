<template>
>456
</template>

<script lang='ts'>
import { state, actions } from '../../../../store/reactives';
import { defineComponent, ref, toRef } from 'vue';

export default defineComponent({
  layout: false,

  setup() {
    const stockProducts = toRef(state, 'stockProducts');
    const brands = toRef(state, 'brands');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectableBrands = toRef(state, 'selectableBrands');
    /// SETUP ROUTING HERE FOR NAVIGATION
    const router = useRouter()
    const route = useRoute()

    const addProducts = async (product)  => {
      await actions.addProducts(product)
    }

    return {
      stockProducts,
      brands,
      selectedCategory,
      selectedBrand,
      selectedProducts,
      selectableBrands,
      addProducts
    }
  },
})
</script>