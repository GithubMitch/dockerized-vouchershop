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
                <pre v-if="$route.params._categoryslug">Selected:
                   
Category    : {{ $route.params._categoryslug }}
Brand       :  -{{ $route.params._brandslug }}
Subcategory :  -{{ $route.params._subcat }}
                </pre>
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
              <ul v-show="$route.params._categoryslug">
                <pre v-show="selectedBrand">Selected: {{ selectedBrand }}</pre>
                <li v-show="selectedBrand.length == 0" v-for="brand in selectableBrands" :key="brand">
                  <NuxtLink class="brandLine" :to='`/category/${$route.params._categoryslug}` + `/brand/` + `${brand.key}`' @click="setSelectedBrand(brand.key)">{{brand.name}}</NuxtLink>
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


          <Suspense>
            <template #default>
              <pre v-show="selectedProducts">Cart: {{ selectedProducts }}</pre>
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
 </div>
</template> 


<script lang="ts">
import { state, actions } from '../store/reactives';
import {
  defineComponent,
  ref,
  toRef,
  watch,
  } from 'vue';

export default defineComponent({
  async setup(props) {
    const router = useRouter();
    // const route = useRoute();
    const stockProducts = toRef(state, 'stockProducts');
    const brands = toRef(state, 'brands');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectableBrands = toRef(state, 'selectableBrands');

    // All lists - remote
    if (stockProducts.value.length == 0 && brands.value.length == 0) {
      await Promise.all([
        actions.fetchProductList(),
        actions.fetchBrandList(),
        actions.fetchStockList(),
        Promise.resolve(`Completed Promise`)
      ])
      // .then(lists => {
      //   // return lists
      //   console.log(lists)
      // })
      .catch(error => console.log(error))
    }

    // Reactive.ts Setters :
    const setSelectedBrand = async (brand)  => {
      await actions.setSelectedBrand(brand)
    }
    const deselect = async (selected)  => {
      await Promise.all([
        actions.deselect(selected),
        router.go(-1),
        Promise.resolve(`Completed Promise`)
      ])
    }
    // // Reactive.ts Getters :
    const getProducts = async ()  => {
      await actions.fetchProductList()
      // console.log("BLAH products", products)
    }

    const stock = async ()  => {
      await actions.fetchStockList()
      console.log('Update Stock')
    }    

    return {
      stockProducts,
      brands,
      selectedCategory,
      selectedBrand,
      selectedProducts,
      selectableBrands,
      deselect,
      stock,
      getProducts,
      setSelectedBrand,
    }
  },
  
})
</script>