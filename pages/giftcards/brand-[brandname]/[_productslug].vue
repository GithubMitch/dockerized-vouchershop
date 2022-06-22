<template>
  <NuxtLayout name="default">
    <template #content>
      <div class="modal">
        <Router-View :pickedproduct="pickedProduct" :product="pickedProduct.product" :details="pickedProduct.thisProductDetails"/>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang='ts'>
import { state, actions } from '../../../store/reactives';
import { defineComponent, toRef, watch} from 'vue';

export default defineComponent({
  layout: 'default',
  async setup() {
    const route = useRoute()
    const pickedProduct = toRef(state, 'productPage');
    const stockProducts = toRef(state, 'stockProducts');
    watch([stockProducts], (newValues, prevValues) => {
      console.log('WATCHER STOCKPRODUCTs' , prevValues, newValues)
      console.log('route.params._productslug :',route.params._productslug)
      getProduct(route.params._productslug)
    })
    const getProduct = async (productslug)  => {
      console.log(route.params._productslug)
      await actions.getProduct(productslug)
    }
    return {pickedProduct}
  },
})
</script>

<style lang="scss" scoped>
.inner.productpage {
  padding:2em;
  overflow: hidden;
  h1,
  h3,
  .button {
    overflow:hidden;
  }
}
 .modal {
    display: flex;
    opacity: 0.9;
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
 }
</style>