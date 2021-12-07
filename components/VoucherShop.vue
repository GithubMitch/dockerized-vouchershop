<template>
 <div class="inner"> 
   <h1>Vouchershop component</h1> 

    <div id="config-window">
      <ul>
        <li>category:</li>
        <li>brand:</li>
        <li>product:</li>
        <li>overview:</li>
        <li>status:</li>
      </ul>


      <Suspense>
        <template #default>
          <pre>{{ products }}</pre>
        </template>
        <template #fallback>
          <div>Loading...</div>

        </template>
      </Suspense>

      <!-- <span>{{ sharedState.message }}</span>  -->
    </div>
    <button  @click="getProducts" >scan products</button>
    <!-- <button  @click="setMsg" >Set message</button> -->
 </div>
</template> 


<script lang="ts">
import { state } from '../store/reactives'
import {ref, toRaw} from 'vue';

export default {

  async setup() {
    // products
    const products = ref<array>([]);

    const getProducts = async ()  => {
      products.value = await useAsyncData("products", () => $fetch("/api/rq"));
      console.log('client side retrieved....', toRaw(products.value) );
    }

    products.value = await getProducts();
    // console.log(state)

    return {products, getProducts}
  }
}
</script>
<!-- <script>
  export default {
    // props: {
    //   category: String,
    //   brand: String,
    //   product: String,
    //   overview: Boolean,
    //   status: Boolean,
    //   data: Object
    // },



    methods: {
      async onclick() {
        try {
          
          console.log('button clicked ')
          // const data = await fetch('/api/scanproducts')
  
          // const data = await $fetch('/api/scanproducts')
          const { data } = await useAsyncData('scanproducts', () => $fetch('/api/scanproducts'))
          console.log(data)
          // return data

        } catch (error) {
            console.log(error)
        }
      }
    }
  }
</script> -->

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

