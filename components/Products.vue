<template>
  <ProductSelection class="inner" :brand="selectedBrand" :products="products" :filter="filter"/>
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
      type: Object,
      default: {}
    },
    filter:{
      type: String,
      default: null
    }
  },
  async setup(props) {
    const stockProducts = toRef(state, 'stockProducts');
    const selectableBrands = toRef(state, 'selectableBrands');
    // const selectedBrand = ref('KPN');
    
    // console.log('Products component: selectedbrand = ',props.selectedBrand )
    // const selectableBrands = toRef(state, 'selectableBrands');
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