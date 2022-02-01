<template>
  <NuxtLayout name="default">
    <template #content>
      <NuxtChild :product="pickedProduct"/>
    </template>
  </NuxtLayout>
</template>

<script lang='ts'>
import { state, actions } from '../../../../store/reactives';
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
      console.log('WATCHER STOCKPRODUCTs' , prevValues, newValues)
      getProduct(route.params._productslug)
    })

    const getProduct = async (productslug)  => {
      await actions.getProduct(productslug)
    }
    
    return {
      pickedProduct,
    }
  },
})
</script>