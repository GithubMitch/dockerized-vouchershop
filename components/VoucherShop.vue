<template>

 <div id="voucherShop" class="inner"> 
   <h1>Vouchershop component</h1> 
    <div id="config-window">
      <ul>
        <li>
          category:
          <span>
            <ClientOnly>

              <pre v-if="$route.params._categoryslug">Selected:
Category    : {{ $route.params._categoryslug }}
Brand       :  -{{ $route.params.brand }}
Subcategory :  -{{ $route.params._for }}
              </pre>
            </ClientOnly>
          </span>
        </li>
        <li>
          brands:
          <ClientOnly>
            <ul v-if="$route.params._categoryslug">
              <pre v-if="selectedBrand">Selected: {{ selectedBrand }}</pre>
              <li v-show="selectedBrand.length == 0" v-for="brand in selectableBrands" :key="brand">
                <NuxtLink class="brandLine" :to='`/${$route.params._categoryslug}` + `/` + `${brand.key}`' @click="setBrand(brand.key)">{{brand.name}}</NuxtLink>
              </li>
            </ul>
          </ClientOnly>
        </li>
        <li>
          products:
            <ClientOnly>
              <pre v-if="selectedProducts">Cart: {{ selectedProducts }}</pre>
            </ClientOnly>
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
      ])
      .then(lists => {
        // return lists
        // actions.fetchStockList()

        console.log('actions, fetch stock list')
        Promise.resolve(`Completed Promise`)

      })
      .catch(error => console.log('vcshop 68',error))
    }

    // Reactive.ts Setters :
    const setBrand = async (brand)  => {
      actions.setSelectedBrand(brand)
    }
    const deselect = async (selected)  => {
      Promise.all([
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
      // await actions.fetchStockList()
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
      setBrand,
    }
  },
  
})
</script>