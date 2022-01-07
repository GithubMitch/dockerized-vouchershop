<template>
  <!-- if actionlabel : show actionLabel_Products -->
  <div class="inner">
    {{products}}
  </div>
</template>

<script lang='ts'>
import { state, actions , methods} from '../../../../store/reactives';
import { defineComponent, ref, toRef } from 'vue';
import {_} from 'vue-underscore';


export default defineComponent({
    props: {
      selectedBrand:{
        type: String,
        default: ''
      },
      products:{
        type: Array,
        default: []
      }
    },
  setup(props) {
    const stockProducts = toRef(state, 'stockProducts');
    const brands = toRef(state, 'brands');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectableBrands = toRef(state, 'selectableBrands');
    const productFilter = toRef(state, 'productFilter');
    methods.filterProducts(stockProducts);
    // console.log(productFilter);

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
      productFilter,
      addProducts
    }
  },
})
</script>