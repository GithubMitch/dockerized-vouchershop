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
              <ul v-show="pickedCategory">
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
              <!-- <Products v-if="pickedBrand" /> -->

              <!-- <ul>
                <pre v-show="selectedProducts">Selected: {{ selectedProducts }}</pre>
                 
                <li v-for="product in stockProducts" :key="product.key">
                  <NuxtLink class="brandLine product" :to='`${selectedCategory}` + `/` + product.actionLabel + `/` + product.key' :class="{instock : product.inStock}" @click="addProducts(product.key)">{{ product.inStock }}</NuxtLink>
                </li>
              </ul> -->
                <!-- <ul>
                  <li class="brandLine" @click="deselect(stockProducts)">Deselect</li>
                </ul> -->
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
import { isAbsent, state, actions , methods} from '../store/reactives';
import {
  defineComponent,
  ref,
  toRef,
  toRaw,
  onMounted,
  onBeforeUpdate,
  onBeforeMount,
  watch,
  reactive,
  readonly,
  isReactive
  } from 'vue';

export default defineComponent({
  async setup(props) {
    const router = useRouter();
    const route = useRoute();
    const stockProducts = toRef(state, 'stockProducts');
    const brands = toRef(state, 'brands');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectableBrands = toRef(state, 'selectableBrands');
    // const selectedBrandProducts = toRef(state, 'selectedBrandProducts');

  
    let pickedCategory = (state.selectedCategory === '/' | state.selectedCategory.length == []) === 0; // step1
    let pickedBrand = (state.selectedBrand.length > 0 || state.selectedBrand !== 0); // step2
    let pickedProducts = ref('false'); // step3

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

    watch([pickedCategory, pickedBrand, pickedProducts], (newValues, prevValues) => {
      console.log('Watch:',newValues, prevValues)
    })


    // All lists - remote
    if (stockProducts.value.length == 0 && brands.value.length == 0) {
      await Promise.all([
        actions.fetchProductList(),
        actions.fetchBrandList(),
        actions.fetchStockList(),
        Promise.resolve(`Completed Promise`)
      ]).then(lists => {
        // return lists
        console.log(lists)
      }).catch(error => console.log(error))
    }

    // Reactive.ts Setters :
    const addProducts = async (product)  => {
      await actions.addProducts(product)
    }
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

    // METHOD 
    // const deselect = async (selected)  => {
    //   switch (selected) {
    //     case (state.brands):
    //       state.selectedBrand = [];
    //       // state.selectedBrandProducts = [];
    //       console.log('Selected Brand', state.selectedBrand);
    //       console.log('Deselect Brands', state.selectedBrand);
    //       break;
    //     case state.stockProducts:
    //       state.selectedProducts = []
    //       console.log('Deselect Products')
    //       break;
    //     case 'Papayas':
    //       console.log('Mangoes and papayas are $2.79 a pound.');
    //       // expected output: "Mangoes and papayas are $2.79 a pound."
    //       break;
    //     default:
    //       console.log(`Oops, The selected part = ${selected}.`);
    //   }      
    // }
    const stock = async ()  => {
      await actions.fetchStockList()
      console.log('Update Stock')
    }    

    return {
      pickedCategory,
      pickedBrand,
      pickedProducts,
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
      addProducts
    }
  },
  
})
</script>

<style scoped>

</style>

