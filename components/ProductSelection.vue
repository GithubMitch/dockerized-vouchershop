
<template>
 <div>
   <h1>{{brand}}</h1>  
    <!-- <pre v-if="selectedProducts.length > 0">Selected: {{ selectedProducts }}</pre> -->
    <ul class="product-list">
      <li v-for="(product) in selectedBrandProducts" :brand="brand"  :key="product.key">
        <NuxtLink class="brandLine product" 
          :to='`goofy`'
          :class="{instock : product.inStock}" 
          >
          <!-- @click="addProducts(product.key)" -->
          {{ product.name }}
        </NuxtLink>
      </li>
      <li class="brandLine" @click="deselect(stockProducts)">
        Deselect
      </li>
    </ul> 
 </div>
</template>

<script>
import { isAbsent, state, actions, methods } from '../store/reactives'
import { defineComponent, onMounted, toRaw , ref, toRef, watch} from 'vue'
import {_} from 'vue-underscore';

export default defineComponent({
  props: {
    brand: {
      type: Array,
      default: isAbsent
    },
    products:{
      type: Array,
      default: []
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const newPath = ref()

    const stockProducts = toRef(state, 'stockProducts');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectableBrands = toRef(state, 'selectableBrands');
    const selectedBrandProducts = toRef(state, 'selectedBrandProducts');

    // working selectedBrandProducts.value = _(props.products).filter({ brand: props.brand, inStock: true // })



    const addProducts = async (product)  => {
      await actions.addProducts(product)
    }
    const deselect = async (selected)  => {
      await Promise.all([
        actions.deselect(selected),
        router.go(-1),
        Promise.resolve(`Completed Promise`)
      ])
    }
    const stock = async (props)  => {
      // console.log(props.products)
      selectedBrandProducts.value = _(props.products).filter({brand: props.brand, inStock: true})

      // console.log('Update brand Products', selectedBrandProducts)
    }
    // initiate selected brand : product list
    stock(props)

    // watcher
    // watch([props], (newValues, prevValues) => {
    //   console.log('Watch:',prevValues, newValues)
    //   stock(props)
    // })

    return {selectedProducts, selectedCategory, stockProducts, selectableBrands, selectedBrandProducts, props, deselect, addProducts }
  },
})
</script>

<style>
  /* css */
</style>