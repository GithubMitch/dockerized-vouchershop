<template keep-alive>
 <div class="inner"> 
   <h1>Vouchershop component</h1> 

    <div id="config-window">
      <ul>
        <li>
          category:
          <Suspense>
            <template #default>
              <span>
                <pre v-if="selectedCategory.length !== 0">Selected: 
                <!-- {{$route.params.slug[0]}}  -->
{{ selectedCategory }}</pre>
              </span>
            </template>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </Suspense>                
        </li>
        <li>
          brands:

          <Suspense>
            <template #default>
              <ul>
                <pre v-show="selectedBrand">Selected: {{ selectedBrand }}</pre>
                 
                <li v-show="selectedBrand.length == 0" v-for="brand in brands" :key="brand">
                  <NuxtLink class="brandLine" :to='`${selectedCategory}` + `/brand/` +brand.key ' @click="setSelectedBrand(brand.key)">{{brand}}</NuxtLink>
                  <!-- <a class="brandLine" @click="setSelectedBrand(brand.key)">{{brand}}</a> -->
                </li>
                <li class="brandLine" @click="deselect(brands)">Deselect</li>
              </ul>
                  
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
              <ul>
                <pre v-show="selectedProducts">Selected: {{ selectedProducts }}</pre>
                 
                <li v-for="product in products" :key="product.key">
                  <a class="brandLine" @click="setSelectedProducts(product.key)">{{ product }}</a>
                </li>
                <li class="brandLine" @click="deselect(products)">Deselect</li>
              </ul>     
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
import {
  defineComponent,
  ref,
  toRef,
  toRaw,
  onMounted,
  onBeforeUpdate,
  onBeforeMount,
  // watchEffect,
  reactive,
  readonly,
  isReactive
  } from 'vue';

export default defineComponent({
  // props: {
  //   products: {
  //     type: [String, Number],
  //     required: false
  //   },  
  //   brands: {
  //     type: [String],
  //     required: false
  //   }
  // },
  async setup(props) {
    const products = toRef(state, 'products');
    const brands = toRef(state, 'brands');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedProducts = toRef(state, 'selectedProducts');

    // onBeforeMount(() => {
    //   // the DOM element will be assigned to the ref after initial render
    //   // if (products.value.length == 0 && brands.value.length == 0) {
    //   //   Promise.all([
    //   //     actions.fetchProductList(),
    //   //     actions.fetchBrandList(),
    //   //   ]).then(lists => {
    //   //     console.log(lists)
    //   //   })
    //   // }
    //   // console.log(isReactive(prodList)) // -> true
    //   // console.log(products, brands)

    // })
    // watchEffect(() => {
    //   // works for reactivity tracking
    //   // console.log("WatchEffect", state)
    //   // console.log("copy", productsCopy.products)
    //   // console.log("copy", brandsCopy.brands)
    // })


    // All lists - remote
    if (products.value.length == 0 && brands.value.length == 0) {
      await Promise.all([
        actions.fetchProductList(),
        actions.fetchBrandList(),
        Promise.resolve(`Completed Promise`)
      ]).then(lists => {
        // return lists
        console.log(lists)
      }).catch(error => console.log(error))
    }

    // Reactive.ts Setters :
    const setSelectedProducts = async (product)  => {
      await actions.setSelectedProducts(product)
    }
    const setSelectedBrand = async (brand)  => {
      await actions.setSelectedBrand(brand)
    }

    // // Reactive.ts Getters :
    // const getProducts = async ()  => {
    //   await actions.fetchProductList()
    //   console.log("BLAH products", products)
    // }
    // // GetProducts - remote list
    // const getBrands = async ()  => {
    //   await actions.fetchBrandList()
    //   console.log("BLAH brands", brands)
    // }



    // METHOD ?
    const deselect = async (selected)  => {
      switch (selected) {
        case (state.brands):
          state.selectedBrand = []
          console.log('Deselect Brands');
          break;
        case state.products:
          state.selectedProducts = []
          console.log('Deselect Products')
          break;
        case 'Papayas':
          console.log('Mangoes and papayas are $2.79 a pound.');
          // expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        default:
          console.log(`Oops, The selected part = ${selected}.`);
      }      
    }

    return {
      products,
      brands,
      selectedCategory,
      selectedBrand,
      selectedProducts,
      deselect,
      // getProducts,
      // getBrands,
      setSelectedBrand,
      setSelectedProducts
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
    /* width:500px; */
    padding:1em;
    overflow: scroll;
  }
  .brandLine {
    cursor:pointer;
  }
  .brandLine:hover {
    text-decoration: underline;
  }
</style>

