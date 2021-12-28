<template>
  <main>
      <!-- <ClientOnly> -->
        <NuxtChild :product="pickedProduct" keep-alive/>
      <!-- </ClientOnly> -->
  </main>
</template>

<script lang='ts'>
import { state, actions } from '../../../../../../store/reactives';
import { defineComponent, onMounted, toRaw , ref, toRef} from 'vue';

export default defineComponent({
  async setup(props) {
    /// SETUP ROUTING HERE FOR NAVIGATION
    const router = useRouter()
    const route = useRoute()
    const pickedProduct = toRef(state, 'productPage');
    
    onMounted(() => {
      /* do something before Vue calls this component's render function */
      state.productPage.length == 0 ? (console.log('Getting Product', state.productPage.length), pickedProduct.value = getProduct(route.params._productslug)) : (console.log('Product was set already', state.productPage) );
      
    }) 

    const getProduct = async (productslug)  => {
      await actions.getProduct(productslug)
    }
    
    return {
      pickedProduct,
      getProduct
    }
  },
})
</script>