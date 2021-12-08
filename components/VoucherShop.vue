<template>
 <div class="inner"> 
   <h1>Vouchershop component</h1> 

    <div id="config-window">
      <ul>
        <li>category:</li>
        <li ref="allbrands">
          brand:
          <Suspense>
            <template #default>
              <span>
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
    <!-- <button  @click="getProducts" >scan products</button>
    <button  @click="getBrands" >scan brands</button> -->
 </div>
</template> 


<script lang="ts">
import { state, actions } from '../store/reactives'
import {defineComponent, ref, toRaw, onMounted} from 'vue';

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

    const allbrands = ref(null)
    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log('mounted')
      console.log("ZZZZZZZZZZZ", allbrands.value)
    })

    const products = ref(state.products);
    const brands = ref(state.brands);

    let fetchedProducts = ref(false);
    let fetchedBrands = ref(false);

    // All lists - remote
    await Promise.all([
      products.value = actions.fetchProductList(props.products),
      brands.value = actions.fetchBrandList(props.brands),
    ]).then(values => {
        // products.value = values[0]
        // brands.value = values[1]
        fetchedProducts.value = true
        fetchedBrands.value = true
        console.log("values++++++" ,values) 
    })

    // GetProducts - remote list
    const getProducts = async ()  => {
      await actions.fetchProductList()
      console.log("BLAH", products.value)
    }
    // GetProducts - remote list
    const getBrands = async ()  => {
      await actions.fetchBrandList()
      console.log("BLAH", brands.value)
    }
    // console.log(state)

    return {
      products,
      // getProducts,
      brands,
      // getBrands,
      fetchedProducts,
      fetchedBrands,
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

