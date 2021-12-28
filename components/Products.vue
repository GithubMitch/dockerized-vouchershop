
<template>
 <div>

    <ProductSelection class="inner" :brand="selectedBrand" :products="stockProducts" keep-alive/>

 </div>
</template> 

<script>
import { state, actions } from '../store/reactives'
import { defineComponent, onBeforeMount, toRaw , ref, watch} from 'vue'

export default defineComponent({
  props: {
    selectedBrand:{
      type: String,
      default: [String]
    }
  },
  async setup(props) {
    console.log('Products.vue props:', props)
    const stockProducts = toRef(state, 'stockProducts');
    // const selectedBrand = toRef(state, 'selectedBrand');
    const selectableBrands = toRef(state, 'selectableBrands');
      
    console.log('stockProducts', stockProducts.value)

    // watcher
    watch([props], (newValues, prevValues) => {
      console.log('Watch:',prevValues, newValues)
      // stock(props)
    })

    return {
      stockProducts, 
      selectableBrands, 
      // selectedBrand
    }
  },
})
</script>