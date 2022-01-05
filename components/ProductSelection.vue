
<template>
 <div>
   <h1>{{brand}}</h1>  
    
    <ul class="product-list">
      <li v-for="(product) in selectedBrandProducts" :brand="brand"  :key="product.key">
        <NuxtLink class="brandLine product" 
          :to='brand + `/` + product.actionLabel + `/`  + product.key'
          :class="{instock : product.inStock}" 
          @click="setProductPage(product)"
          >
          {{ product.name }}
        </NuxtLink>
      </li>
      <li class="brandLine deselect" @click="deselect(stockProducts)">
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
      type: String,
      default: ''
    },
    products:{
      type: Array,
      default: []
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()

    const stockProducts = toRef(state, 'stockProducts');
    const selectedCategory = toRef(state, 'selectedCategory');
    const selectedProducts = toRef(state, 'selectedProducts');
    const selectedBrandProducts = toRef(state, 'selectedBrandProducts');

    const setProductPage = async (product)  => {
      await actions.setProductPage(product)
    }
    const deselect = async (selected)  => {
      await Promise.all([
        actions.deselect(selected),
        router.go(-1),
        Promise.resolve(`Completed Promise`)
      ])
    }

      // const stock = async (stockProducts)  => {
      //   selectedBrandProducts.value = _(stockProducts.value).filter({brand: selectedBrand.value, inStock: true})
      // }
      // // watcher
      // watch([stockProducts], (newValues, prevValues) => {
      //   stock(stockProducts)
      // })

    return {
      selectedProducts, 
      selectedCategory, 
      stockProducts, 
      selectedBrandProducts, 
      props, 
      setProductPage, 
      deselect 
    }
  },
})
</script>

<style>
  /* css */
</style>