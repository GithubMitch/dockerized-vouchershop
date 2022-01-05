<template>
 <div class="inner"> 
   <h1>Vouchershop component</h1> 
    <div id="config-window">
      <ul>
        <li>
          category:
              <span>
                <pre v-if="$route.params._categoryslug">Selected:
Category    : {{ $route.params._categoryslug }}
Brand       :  -{{ $route.params._brand }}
Subcategory :  -{{ $route.params._for }}
                </pre>
              </span>
        </li>
        <li>
          brands:
              <ul v-show="$route.params._categoryslug">
                <pre v-show="selectedBrand">Selected: {{ selectedBrand }}</pre>
                <li v-show="selectedBrand.length == 0" v-for="brand in selectableBrands" :key="brand">
                  <NuxtLink class="brandLine" :to='`/category/${$route.params._categoryslug}` + `/brand/` + `${brand.key}`' @click="setSelectedBrand(brand.key)">{{brand.name}}</NuxtLink>
                </li>
                <li class="brandLine" @click="deselect(brands)">Deselect</li>
              </ul>
        </li>
        <li>
          products:
              <pre v-show="selectedProducts">Cart: {{ selectedProducts }}</pre>
        </li>
        <li>overview:</li>
        <li>status:</li>
      </ul>
    </div>
 </div>
</template> 


<script >
import { state, actions } from '../store/reactives';
import {
  defineComponent,
  toRef,
  } from 'vue';

export default defineComponent({
  async setup() {
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