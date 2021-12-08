<template>
 <div class="inner"> 
   <h1>Vouchershop component</h1> 

    <div id="config-window">
      <ul>
        <li>category:</li>
        <li>
          brand:
          <Suspense>
            <template #default>
              <span ref="REF">
                {{ brands }}
              </span>
            </template>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </Suspense>          
        </li>
        <li>
          products:
          <Suspense >
            <template #default>
              <span>
                {{ products }}
              </span>              
            </template>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </Suspense>
        </li>
        <li>overview:</li>
        <li>status:</li>
      </ul>
    </div>
    <button  @click="getProducts" >scan products</button>
    <button  @click="getBrands" >scan brands</button>
 </div>
</template> 


<script lang="ts">
import { state, actions } from '../store/reactives'
import {defineComponent, ref, toRef, toRaw, onMounted, watchEffect, reactive, readonly, isReactive} from 'vue';

export default defineComponent({
  props: {
    products: {
      type: [String, Number],
      required: false
    },  
    brands: {
      type: [String],
      required: false
    }
  },
  async setup(props) {
    const products = toRef(state, 'products');
    const brands = toRef(state, 'brands');

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      // Promise.all([
        // actions.fetchProductList(),
        // actions.fetchBrandList(),
      // ])
      // console.log(isReactive(prodList)) // -> true
      console.log(products, brands)

    })
    watchEffect(() => {
      // works for reactivity tracking
      // console.log("WatchEffect", state)
      // console.log("copy", productsCopy.products)
      // console.log("copy", brandsCopy.brands)
    })

    // actions.fetchProductList()
    // actions.fetchBrandList()

    // All lists - remote
    await Promise.all([
      actions.fetchProductList(),
      actions.fetchBrandList(),
    ])
    // .then(values => {
    //     // products.value = values[0]
    //     // brands.value = values[1]
    //     // fetchedProducts.value = true
    //     // fetchedBrands.value = true

    //     console.log("values++++++" ,values) 
    // })

    // GetProducts - remote list
    const getProducts = async ()  => {
      await actions.fetchProductList()
      console.log("BLAH products", products)
    }
    // GetProducts - remote list
    const getBrands = async ()  => {
      await actions.fetchBrandList()
      console.log("BLAH brands", brands)
    }

    return {
      products,
      brands,
      getProducts,
      getBrands
    }
  },
  
})
</script>

<style scoped>
  #config-window {
    box-shadow: inset 0px 0px 10px -4px #000; 
    box-sizing:border-box;
    background:#ebebeb;
    height:500px;
    width:500px;
    padding:1em;
    overflow: scroll;
  }
</style>

