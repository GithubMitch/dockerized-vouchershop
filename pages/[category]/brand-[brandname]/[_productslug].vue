<template>
  <div class="modal">
    <Router-View :pickedproduct="pickedProduct" :product="pickedProduct.product" :details="pickedProduct.thisProductDetails"/>
  </div>
</template>

<script lang='ts'>
import { state, actions } from '../../../store/reactives';
import { defineComponent, toRef, watch} from 'vue';

export default defineComponent({
  layout: 'default',
  head() {
    return {
      title: 'VoucherShop - Product-page',
      link: [
        {
          rel: "stylesheet",
          href: "/assets/iconfont/iconfont.css"
        }
      ],
      meta: [
        {
          hid: 'ABOUT-HID',
          name: `About page`,
          content: 'Website about page'
        }
      ]
    }
  },
  async setup(props) {
    const setupAppReady = toRef(state, 'setupAppReady')
    /// SETUP ROUTING HERE FOR NAVIGATION
    const router = useRouter()
    const route = useRoute()
    const pickedProduct = toRef(state, 'productPage');
    const stockProducts = toRef(state, 'stockProducts');
    watch([stockProducts], (newValues, prevValues) => {
      console.log('WATCHER stockProducts' , prevValues, newValues)
      getProduct(route.params._productslug)
    })
    const getProduct = async (productslug)  => {
      console.log(route.params._productslug)
      await actions.getProduct(productslug)
    }
    return {
      pickedProduct,
    }
  },
})
</script>

<style lang="scss" scoped>
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