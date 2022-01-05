<template>
  <ProductSelection class="inner" :brand="selectedBrand" :products="products" keep-alive/>
</template> 

<script>
import { state, actions } from '../store/reactives'
import { defineComponent, onBeforeMount, toRaw , ref, watch} from 'vue'

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
  async setup(props) {
    const stockProducts = toRef(state, 'stockProducts');
    const selectableBrands = toRef(state, 'selectableBrands');
      

    // // watcher
    // watch([props], (newValues, prevValues) => {
    // })

    return {
      stockProducts, 
      selectableBrands, 
      // selectedBrand
    }
  },
})
</script>