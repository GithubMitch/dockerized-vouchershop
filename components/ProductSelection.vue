
<template>
 <div>
   <h1>{{brand}}</h1>  
    <!-- <pre v-if="selectedProducts.length > 0">Selected: {{ selectedProducts }}</pre> -->
    <ul class="product-list">
      <li v-for="(product) in selectedBrandProducts" :brand="selectedBrand"  :key="product.key">
        <NuxtLink class="brandLine product" 
          :to='brand + `/` + product.actionLabel + `/`  + product.key'
          :class="{instock : product.inStock}" 
          @click="setProductPage(product)"
          >
          <!-- :to='`${selectedCategory}` + `/` + product.actionLabel + `/` + product.key' -->
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
      type: String,
      default: [String]
    },
    selectedBrand: {
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
    const selectableBrands = toRef(state, 'selectableBrands');
    const selectedBrandProducts = toRef(state, 'selectedBrandProducts');

    // working selectedBrandProducts.value = _(props.products).filter({ brand: props.brand, inStock: true // })

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
    const stock = async (props)  => {
      console.log(props.products)
      selectedBrandProducts.value = _(props.products).filter({brand: props.brand, inStock: true})

      console.log('Update brand Products', selectedBrandProducts)
    }
    // initiate selected brand : product list
    onMounted(() => {
      // if not mounted it will fire before there is any data
      stock(props)
    })

    return {
      selectedProducts, 
      selectedCategory, 
      stockProducts, 
      selectableBrands, 
      selectedBrandProducts, 
      props, setProductPage,
      deselect 
    }
  },
})
</script>

<style>
  /* css */
</style>