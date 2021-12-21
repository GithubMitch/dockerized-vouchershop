
<template>
 <div>
   <ProductSelection class="inner" :brand="selectedBrand" :products="stockProducts" />
 </div>
</template> 

<script>
import { state, actions } from '../store/reactives'
import { defineComponent, onMounted, toRaw , ref, watch} from 'vue'

export default defineComponent({
  setup(props) {
    const stockProducts = toRef(state, 'stockProducts');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectableBrands = toRef(state, 'selectableBrands');

    console.log(stockProducts.value)
    return {stockProducts, selectableBrands, selectedBrand}
  },
})

</script>

<style>
  /* css */
</style>