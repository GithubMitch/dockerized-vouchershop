<template>
    <main>
      /category/_slug/[brand]/_slug/_subcat/_product.vue
      <!-- <Products/> -->

      <!-- <VoucherShop/> -->
      <NuxtChild keep-alive/>
    </main>

</template>

<script lang='ts'>
import { state, actions, methods } from '../../../../../../store/reactives';
import { defineComponent, onMounted, toRaw , ref, toRef} from 'vue';

export default defineComponent({
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
    const newPath = ref()


    const addProducts = async (product)  => {
      await actions.addProducts(product)
    }

    onMounted(() => {

    })

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

<style>
  /* RESET STYLE SHEET */


</style>
