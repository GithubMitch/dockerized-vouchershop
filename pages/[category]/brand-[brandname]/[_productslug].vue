<template>
  <NuxtLayout name="default">
    <template #content>
      <div class="modal">
        <Router-View :pickedproduct="pickedProduct" :product="pickedProduct.product" :details="pickedProduct.providedDetails"/>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang='ts'>
import { state, actions } from '../../../store/reactives';
import { defineComponent, onMounted, toRef, watch} from 'vue';

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
    onMounted(() => {
      /* do something before Vue calls this component's render function */
      // state.productPage.length == 0 ? (console.log('Getting Product', state.productPage.length), pickedProduct.value = getProduct(route.params._productslug)) : (console.log('Product was set already', state.productPage) );
    }) 


    watch([stockProducts], (newValues, prevValues) => {
      console.log('WATCHER stockProducts' , prevValues, newValues)
      // console.log('WATCHER STOCKPRODUCTs' , prevValues, newValues)
      // console.log('route.params._productslug :',route.params._productslug)
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
   padding-top:10em;
   display:block;
   opacity:.9;
   position:absolute;
   z-index:9999;
   top:0;
   left:0;
   width:100%;
   height:100%;
   background:#fff;
 }
</style>